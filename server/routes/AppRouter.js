const Router = require('express').Router()

const UserRouter = require('./UserRouter')
const TagRouter = require('./TagRouter')

Router.use('/user', UserRouter)
Router.use('/tags', TagRouter)

module.exports = Router