const Router = require('express').Router()

const UserRouter = require('./UserRouter')

Router.use('/user', UserRouter)

module.exports = Router