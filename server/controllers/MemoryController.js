const { response } = require('express')
const { Memory, TagMemory, Location, Tag, sequelize } = require('../models')

/* 
   create memory takes a user_id param and a req.body of 
   {
      name: <name>,
      description: <description>,
      public: <true|false>    //optional...default to false,
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
         })

         const newTags = req.body.tags
         newTags.forEach(async (e, i) => {
            const tag = await TagMemory.create({
               memoryId: memory.id,
               tagId: e,
            })
         })

         const location = await Location.create({
            memoryId: memory.id,
            long: req.body.location.long,
            lat: req.body.location.lat,
         })

         resp.send({
            id: memory.id,
            msg: 'Memory created',
         })
      })
   } catch (err) {
      console.log('Error in MemoryController.CreateMemory', err)
      throw err
   }
}

/* 
   updates an existing memory. takes a memory_id param and a req.body of 
   {
      name: <name>,
      description: <description>,
   }

*/
const UpdateMemory = async (req, resp) => {
   try {
      const memory = await Memory.update(
         {
            name: req.body.name,
            description: req.body.description,
         },
         {
            where: { id: parseInt(req.params.memory_id) },
         }
      )
      resp.send({ msg: 'Memory updated' })
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

module.exports = {
   CreateMemory,
   UpdateMemory,
   UpdateTags,
   DeleteMemory,
}
