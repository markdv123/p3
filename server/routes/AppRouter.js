const Router = require('express').Router()

const UserRouter = require('./UserRouter')
const TagRouter = require('./TagRouter')
const MemoryRouter = require('./MemoryRouter')

Router.use('/user', UserRouter)
Router.use('/tags', TagRouter)
Router.use('/memory', MemoryRouter)

module.exports = Router