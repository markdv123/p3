const { User, Memory } = require ('../models')
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
         as: 'memories'
      }} )
       // +== should this pre-load tags?  would we do that by iterating the memories and calling getTags? or is it a findAll/include
      // User.findAll({ include: { all: true, nested: true }});
      if ( user && (await checkPassword( password, user.password) ) ) {
         const payload = {
            name: user.name,
            id: user.id,
            memories: user.memories            
          }
          resp.locals.payload = payload
          return next()
      }
      return resp.status(401).send({ msg: 'Unauthorized' })
    } catch (err) {
      throw err
    }
}

// body { name: , email: , password: }
const CreateUser = async (req, resp, next) => {
   try {
      const password_digest = await generatePassword (req.body.password)
      const userBody = { name: req.body.name, email: req.body.email, password: password_digest }
      const user = await User.create( userBody )
      const payload = {
         id: user.id,
         name: user.name,
         memories: []
       }
       resp.locals.payload = payload

      return next()
   }
   catch (err) {
      throw err
   }
}

module.exports = {
   Login,
   CreateUser
}
