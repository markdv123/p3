const { response } = require('express')
const { Memory, TagMemory, Location, Tag, User, sequelize, Image } = require('../models')
const AWSservice = require('../middleware/AWSservice')

/* 
   create memory takes a user_id param and a req.body of 
   {
      name: <name>,
      description: <description>,
      public: <true|false>    //optional...default to false,
      date: <memoryDate>      //optional...default to null
      location: { long: <longitude>, lat: <lattitude> }
      tags: [ <tagId>, <tagId>, ... ]
   }
*/

const manageTags = async ( tags ) => {
   return await Promise.all( tags.map ( async (tag) => {
      if ( tag.id === -1 ) {
         const newTag = await Tag.create( { name: tag.name })
         return { id: newTag.id, name: tag.name }
      }
      else
         return { id: tag.id, name: tag.name }
   }) )
}


const CreateMemory = async (req, resp) => {
   try {
      const result = await sequelize.transaction(async (t) => {
         const userId = parseInt(req.params.user_id)
         const memory = await Memory.create({
            user_id: userId,
            name: req.body.name,
            description: req.body.description,
            public: req.body.public ? req.body.public : false,
            date: req.body.date ? req.body.date : null
         })

         let newTags = [...req.body.tags]
         // see if we have any new tags
         if ( req.body.tags.find(e => e.id === -1) ) {
            newTags = await manageTags ( oldMemory.tags )
         }

         await TagMemory.bulkCreate(
            newTags.map((e) => ({
               memoryId: memory.id,
               tagId: e.id,
            }))
         )

         await Location.create({
            memoryId: memory.id,
            long: req.body.location.long,
            lat: req.body.location.lat,
         })

         resp.send({
            id: memory.id,
            public: memory.public,
            ...req.body,
         })
      })
   } catch (err) {
      console.log('Error in MemoryController.CreateMemory', err)
      throw err
   }
}

/* 
   updates an existing memory. takes a memory_id param and a req.body of a memory (same as for create but no location)
*/
const UpdateMemory = async (req, resp) => {
   try {
      const oldMemory = req.body.memory
      
      const memoryId = parseInt(req.params.memory_id)
      const result = await sequelize.transaction(async (t) => {
         const memory = await Memory.update(
            {
               name: oldMemory.name,
               description: oldMemory.description,
               public: oldMemory.public,
               date: oldMemory.date
            },
            {
               where: { id: memoryId },
            }
         )

         let newTags = [...oldMemory.tags]
         // see if we have any new tags
         if ( oldMemory.tags.find(e => e.id === -1) ) {
            newTags = await manageTags ( oldMemory.tags )
         }

         // first delete the tags for this memory
         await TagMemory.destroy({ where: { memory_id: memoryId } })

         await TagMemory.bulkCreate(
            newTags.map((e) => ({
               memoryId: memoryId,
               tagId: e.id,
            }))
         )
      })

      const updMemory = await Memory.findByPk(memoryId, {
         include: [
            {
               model: Location,
               as: 'location',
               attributes: ['lat', 'long'],
            },
         ],
         attributes: ['id', 'name', 'description', 'public', 'date'],
      })

      resp.send({
         id: memoryId,
         location: updMemory.location,
         ...oldMemory,
      })
   } catch (err) {
      console.log('Error in MemoryController.UpdateMemory', err)
      throw err
   }
}

/* 
   replaces all tags for the memory identified by req.param.memory_id
   body has a tags array
*/

const UpdateTags = async (req, resp) => {
   try {
      const memoryId = parseInt(req.params.memory_id)
      const result = await sequelize.transaction(async (t) => {
         // first delete the tags for this memory
         await TagMemory.destroy({ where: { memory_id: memoryId } })
         await TagMemory.bulkCreate(
            req.body.tags.map((e) => ({
               memoryId: memoryId,
               tagId: e,
            }))
         )
      })
      resp.send({ msg: 'Tags updated' })
   } catch (err) {
      console.log('Error in MemoryController.UpdateMemory', err)
      throw err
   }
}

/* 
   deletes a memory identified by req.param.memory_id
*/
const DeleteMemory = async (req, resp) => {
   try {
      await Memory.destroy({
         where: { id: parseInt(req.params.memory_id) },
      })
      resp.send({ msg: 'Memory destroyed' })
   } catch (err) {
      console.log('Error in MemoryController.DeleteMemory', err)
      throw err
   }
}

/* 
   get all memories for a user
*/
const GetMemories = async (req, resp) => {
   try {
      const userId = parseInt(req.params.user_id)
      const memories = await Memory.findAll({
         where: { user_id: userId },

         include: [
            {
               model: Location,
               as: 'location',
               attributes: ['lat', 'long'],
            },
            {
               model: Tag,
               as: 'tags',
               attributes: ['id', 'name'],
               through: { attributes: [] },
            },
            {
               model: Image,
               as: 'images',
               attributes: ['id', 'url']
            }
         ],
         attributes: ['id', 'name', 'description', 'public', 'date'],
         order: [ ['created_at', 'DESC'], 
         [ { model: Tag, as: 'tags' }, 'name', 'ASC'] ]
      })

      return resp.send(memories)
   } catch (err) {
      console.log('Error in MemoryController.GetMemories', err)
      throw err
   }
}


const GetPublicMemories = async (req, resp) => {
   try {
      const memories = await Memory.findAll({
         where: { public: true },

         include: [
            {
               model: Location,
               as: 'location',
               attributes: ['lat', 'long'],
            },
            {
               model: Tag,
               as: 'tags',
               attributes: ['id', 'name'],
               through: { attributes: [] },
            },
            {
               model: User,
               as: 'user',
               attributes: [ 'name' ]
            },
            {
               model: Image,
               as: 'images',
               attributes: ['id', 'url']
            }
         ],
         attributes: ['id', 'name', 'description', 'public', 'date'],
         order: [ ['created_at', 'DESC'], 
         [ { model: Tag, as: 'tags' }, 'name', 'ASC'] ]
      })

      return resp.send(memories)
   }
   catch ( err) {
      console.log ( 'Error in MemoryController.GetPublicMemories', err)
      throw err
   }
}

const AddImage = async (req, res) => {
   try {
      const memoryId = parseInt(req.params.memory_id)
      let images = req.files.map((file)=> ({
         Body: file.buffer,
         Key: `${memoryId}/${file.originalname}`,
         ContentType: file.mimetype
      }))
      const uploadedImages = await Promise.all(images.map(async (image) => {
         let location = await AWSservice.upload(image)
         return {
            memoryId,
            url: location
         }
      }))
      await Image.bulkCreate(uploadedImages)
      res.send('images uploaded')
   } catch (error) {
      throw error
   }
}


module.exports = {
   CreateMemory,
   UpdateMemory,
   UpdateTags,
   DeleteMemory,
   GetMemories,
   GetPublicMemories,
   AddImage
}
