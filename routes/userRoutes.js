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
router.get('/users',authenticateJWT,UserController.view)
router.get('/users/:id',authenticateJWT,UserController.viewId)

router.put('/lobby/:id',authenticateJWT,MesssageController.edit)
router.put('/users/:id/promote',authenticateJWT,UserController.promoteUser)
router.put('/users/:id/demote',authenticateJWT,UserController.demoteUser)

router.delete('/lobby/:id',authenticateJWT,MesssageController.del)

module.exports = router