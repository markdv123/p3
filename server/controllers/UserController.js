const { User, Memory, Location, Tag, TagMemory } = require ('../models')
const bcrypt = require('bcrypt')

require('dotenv').config()
const saltRounds = parseInt(process.env.SALT_ROUNDS)

const {
   checkPassword,
   generatePassword
 } = require('../middleware/passwordHandler')

 // req.body is { email: <email>, password: <password> }
const Login = async (req, resp, next) => {
   try {
      const email = req.body.email
      const password = req.body.password
      const user = await User.findOne( { where: { email: email }, include: {
         model: Memory,
         as: 'memories',
         include: [
            { 
               model: Location,
               as: 'locations',
               attributes: [ 'lat','long' ]
            },
            {
               model: Tag,
               as: 'tags',
               attributes: [ 'id', 'name' ],
               through: { attributes: [] }
            }
         ],
         attributes: [ 'id', 'name', 'description' ],
      }} )
       

      if ( user && (await checkPassword( password, user.password) ) ) {
         // clean up the tags in memories
         const memories = user.memories.map( e => {
            const tags = [...e.dataValues.tags ]
            tags.sort( (a,b) => a.dataValues.name < b.dataValues.name ? -1 : 1 )
            return {
               id: e.dataValues.id,
               name: e.dataValues.name,
               description: e.dataValues.description,
               location: e.dataValues.locations.dataValues,
               tags: tags.map ( tag => tag.dataValues.id )
            }
         })
         const payload = {
            name: user.name,
            id: user.id,
            memories: memories
          }
          resp.locals.payload = payload
          return next()
      }
      return resp.status(401).send({ msg: 'Unauthorized' })
    } catch (err) {
       console.log ( "Error in UserController.Login", err)
      throw err
    }
}

// body { name: , email: , password: }
const CreateUser = async (req, resp, next) => {
   try {
      // first check to see if the user already exists, if so, return a graceful error...
      const checkUser = await User.findOne( { where: { email: req.body.email } } )
      if ( checkUser ) {
         return resp.status(400).send({ msg: 'Error creating account' })
      }

      const password_digest = await generatePassword (req.body.password)
      const userBody = { name: req.body.name, email: req.body.email, password: password_digest }
      const user = await User.create( userBody )
      const payload = {
         id: user.id,
         msg: 'User created'
       }
       resp.locals.payload = payload

      return next()
   }
   catch (err) {
      console.log ( "Error in UserController.CreateUser", err)
      throw err
   }
}

const RefreshSession = (req, resp) => {
   const payload = resp.locals.payload
   resp.send( payload )
}

const UpdatePassword = async (req, resp) => {
   try {
      const email = req.body.email
      const user = await User.findOne( { where: { email: email } } )       

      if ( user && (await checkPassword( req.body.oldPassword, user.password) ) ) {
         const password_digest = await generatePassword (req.body.newPassword)
         await User.update( { password: password_digest }, { where: { email: email } } )

         return resp.send( { msg: 'Password updated' } )
      }

      return resp.status(401).send({ msg: 'Unauthorized' })
   }
   catch (err) {
      console.log('Error in UserController.UpdatePassword', err)
      throw err
   }
}

const UpdateName = async ( req, resp ) => {
   try {
      const user = await User.update( { name: req.body.name }, { where: { email: req.body.email } } )
      resp.send( { msg: 'User updated' })
   }
   catch ( err ) {
      console.log ( 'Error in UserController.UpdateName', err)
      throw err
   }
}

module.exports = {
   Login,
   CreateUser,
   RefreshSession,
   UpdatePassword,
   UpdateName
}
