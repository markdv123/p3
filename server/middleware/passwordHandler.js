const bcrypt = require('bcrypt')
require('dotenv').config()
const saltRounds = parseInt(process.env.SALT_ROUNDS)

const generatePassword = async ( password ) => {
   const password_digest = await bcrypt.hash(password, saltRounds)
   return password_digest
}

const checkPassword = async ( sentPassword, storedPassword) => {
   const passwordValid = await bcrypt.compare(sentPassword, storedPassword)
   return passwordValid
}

module.exports = {
   generatePassword,
   checkPassword
}