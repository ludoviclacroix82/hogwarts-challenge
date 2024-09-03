// routes/userRoutes
const express = require("express")
const jwt = require ( 'jsonwebtoken' ) 
const router = express.Router()
const UserController = require("../controllers/UserController")
const MesssageController = require('../controllers/MessageController')
const { authenticateJWT } = require('../helpers/helpers')

router.post("/register", UserController.create)
router.post("/login", UserController.login)
router.post ('/lobby' , authenticateJWT, MesssageController.create)

router.get('/lobby',authenticateJWT,MesssageController.view)
router.get('/lobby/:id',authenticateJWT,MesssageController.viewId)

router.put('/lobby/:id',authenticateJWT,MesssageController.edit)

router.delete('/lobby/:id',authenticateJWT,MesssageController.del)

module.exports = router