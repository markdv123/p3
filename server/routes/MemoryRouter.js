const Router = require('express').Router()

const { verifyToken, getToken } = require('../middleware/jwtHandler')
const controller = require('../controllers/MemoryController')

Router.post('/create/:user_id', getToken, verifyToken,  controller.CreateMemory)
Router.put('/update/:memory_id', getToken, verifyToken,  controller.UpdateMemory)
Router.delete('/:memory_id',  getToken, verifyToken, controller.DeleteMemory)
Router.get('/user/:user_id',  getToken, verifyToken, controller.GetMemories)
Router.post('/image/:memory_id', getToken, verifyToken, controller.AddImage)

Router.get('/public', controller.GetPublicMemories)

module.exports = Router
