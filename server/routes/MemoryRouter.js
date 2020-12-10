const Router = require('express').Router()
const multer = require('multer')

const { verifyToken, getToken } = require('../middleware/jwtHandler')
const controller = require('../controllers/MemoryController')
let storage = multer.memoryStorage()
const upload = multer({
    storage: storage
})

Router.post('/create/:user_id', getToken, verifyToken,  controller.CreateMemory)
Router.put('/update/:memory_id', getToken, verifyToken,  controller.UpdateMemory)
Router.delete('/:memory_id',  getToken, verifyToken, controller.DeleteMemory)
Router.get('/user/:user_id',  getToken, verifyToken, controller.GetMemories)
Router.post('/image/:memory_id', 
// getToken, 
// verifyToken,
 upload.array('images', 3), controller.AddImage)

Router.get('/public', controller.GetPublicMemories)

module.exports = Router
