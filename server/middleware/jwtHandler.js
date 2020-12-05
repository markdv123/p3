const jwt = require('jsonwebtoken')
require('dotenv').config()

const secretKey = process.env.SECRET_KEY

const getToken = (req, resp, next) => {
   const token = req.headers['authorization'].split(' ')[1]
   resp.locals.token = token
   next()
}

const verifyToken = (req, resp, next) => {
   let token = resp.locals.token
   jwt.verify(token, secretKey, (err, t) => {
      if (err) {
         return resp.status(401).json({ msg: 'Invalid Token]' })
      }
      resp.locals.payload = t
      return next()
   })
}

const createToken = (req, res) => {
   const token = jwt.sign(res.locals.payload, secretKey)
   res.send({ user: res.locals.payload, token } )
}

module.exports = {
   createToken,
   verifyToken,
   getToken
}