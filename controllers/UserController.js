// controllers/UserController
const User = require('../models/UserModel')
const { hashPwd, comparPwd , createToken } = require('../helpers/helpers')

/**
 * Handles user registration by creating a new user in the database.
 *
 * @param {Object} req - The HTTP request object. Contains user details in req.body.
 * @param {Object} res - The HTTP response object. Used to send responses back to the client.
 * @passwordHash - Hash the password function hashPwd() [helpers]
 */
const create = async (req, res) => {
    const { email, user_name, password, house } = req.body

    try {
        const userExists = await User.findOne({ email: email })

        if (userExists) {
            return res.status(400).json({ message: "Email already in use" })
        }

        const passwordHash = await hashPwd(password) // hash le password

        let user = new User({ email, user_name, password: passwordHash, house })
        user.save()
        return res.status(201).json({ message: "Registration successful" })

    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }
}
/**
 * Login User 
 * @param {Object} req - The HTTP request object. Contains user details in req.body.
 * @param {Object} res - The HTTP response object. Used to send responses back to the client.
 * @returns status , datas connexion ,token 
 */
const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email: email })

        if (!user) {
            return res.status(400).json({ message: "user non found!" })
        }

        const passwordIsOk = await comparPwd(password,user.password) // comprae user inpur pasword & data password user
        const datasUser = [{"email": user.email}]
        
        if(passwordIsOk){
            const token = createToken(user.user_name) // create de token 
            return res.status(200).json({code:200,message : "login successful",datasUser, token})

        }else{
            return res.status(400).json({message : "login failed"})
        }


    } catch (error) {

    }
}

module.exports = {
    create,
    login,
}
