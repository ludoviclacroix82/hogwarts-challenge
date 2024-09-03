// routes/userRoutes
const express = require("express");
const router = express.Router();

const { create } = require("../controllers/UserController")

router.post("/register", create)
router.get("/", (req, res) => {
    res.send("Bonjour")
})

module.exports = router