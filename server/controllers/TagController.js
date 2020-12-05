const { Tag } = require('../models')

const GetTags = async (req, resp) => {
   try {
      const tags = await Tag.findAll({
         attributes: ['id', 'name'] ,
      })
      resp.send(tags)
   } catch (err) {
      console.log('Error in TagController.GetTags', err)
      throw err
   }
}

module.exports = {
   GetTags,
}
