const Router = require('express').Router()
const {
   createToken,
   verifyToken,
   getToken,
} = require('../middleware/jwtHandler')
const controller = require('../controllers/UserController')

Router.post('/login', controller.Login, createToken)
Router.post('/create', controller.CreateUser, createToken)
Router.get('/refresh/session', getToken, verifyToken, controller.RefreshSession)
Router.put('/password', getToken, verifyToken, controller.UpdatePassword)
Router.put('/name', getToken, verifyToken, controller.UpdateName, createToken)

module.exports = Router
