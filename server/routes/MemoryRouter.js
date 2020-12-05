const Router = require('express').Router()

const { verifyToken, getToken } = require('../middleware/jwtHandler')
const controller = require('../controllers/MemoryController')

// Router.get('/', getToken, verifyToken, controller.GetTags)
Router.post('/create/:user_id', controller.CreateMemory)

module.exports = Router
