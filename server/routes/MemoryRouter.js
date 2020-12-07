const Router = require('express').Router()

const { verifyToken, getToken } = require('../middleware/jwtHandler')
const controller = require('../controllers/MemoryController')

Router.post('/create/:user_id', controller.CreateMemory)
Router.put('/update/:memory_id', controller.UpdateMemory)
// Router.put('/tags/:memory_id', controller.UpdateTags)
Router.delete('/:memory_id', controller.DeleteMemory)

module.exports = Router
