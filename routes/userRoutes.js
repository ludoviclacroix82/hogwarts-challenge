// routes/userRoutes
const express = require("express")
const jwt = require ( 'jsonwebtoken' ) 
const router = express.Router()
const UserController = require("../controllers/UserController")
const MesssageController = require('../controllers/MessageController')
const { authenticateJWT } = require('../helpers/helpers')

router.post("/register", UserController.create)
router.post("/login", UserController.login)

router. post ( '/lobby' , authenticateJWT, MesssageController.create) 

module.exports = router