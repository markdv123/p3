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

module.exports = {
   CreateMemory,
}
