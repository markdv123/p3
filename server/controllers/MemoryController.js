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

         const tagList = []
         const newTags = req.body.tags
         newTags.forEach(async (e, i) => {
            const tag = await TagMemory.create({
               memoryId: memory.id,
               tagId: e,
            })
            tagList.push(tag.tagId)
         })

         const location = await Location.create({
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

         // first delete the tags for this memory
         await TagMemory.destroy({ where: { memory_id: memoryId } })

         await TagMemory.bulkCreate(
            oldMemory.tags.map((e) => ({
               memoryId: memoryId,
               tagId: e,
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
         order: [ ['created_at', 'DESC']]
      })

      // clean up the tags in memories
      const finalMemories = memories.map((e) => {
         const tags = [...e.dataValues.tags]
         tags.sort((a, b) => (a.dataValues.name < b.dataValues.name ? -1 : 1))
         return {
            id: e.dataValues.id,
            name: e.dataValues.name,
            description: e.dataValues.description,
            location: e.dataValues.location.dataValues,
            date: e.dataValues.date,
            tags: tags.map((tag) => tag.dataValues.id),
            public: e.dataValues.public,
            images: e.dataValues.images
         }
      })

      resp.send(finalMemories)
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
            }
         ],
         attributes: ['id', 'name', 'description', 'public', 'date'],
      })

      // clean up the tags in memories
      const finalMemories = memories.map((e) => {
         const tags = [...e.dataValues.tags]
         tags.sort((a, b) => (a.dataValues.name < b.dataValues.name ? -1 : 1))
         return {
            id: e.dataValues.id,
            name: e.dataValues.name,
            description: e.dataValues.description,
            location: e.dataValues.location.dataValues,
            date: e.dataValues.date,
            tags: tags.map((tag) => tag.dataValues.id),
            public: e.dataValues.public,
            user: e.dataValues.user.name
         }
      })

      resp.send(finalMemories)
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
      console.log(uploadedImages)
      // const image = await Image.create({
      //    memory_id: memoryId,
      //    url: req.body.url
      // })
      // res.send(image)
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
