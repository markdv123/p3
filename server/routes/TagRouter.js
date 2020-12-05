const Router = require('express').Router()

const { verifyToken, getToken } = require('../middleware/jwtHandler')
const controller = require('../controllers/TagController')

Router.get('/', getToken, verifyToken, controller.GetTags)

module.exports = Router
