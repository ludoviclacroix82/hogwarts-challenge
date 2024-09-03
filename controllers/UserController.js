// controllers/UserController

const User = require('../models/UserModel')


const create = async (req,res) =>{
    const { email,user_name,password,house } = req.body

    const userExists = await User.findOne({ email: email })

    res.send(email)
    
}

module.exports = {
    create,
}