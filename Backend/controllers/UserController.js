// controllers/UserController
const User = require('../models/UserModel')
const { hashPwd, comparPwd, createToken } = require('../helpers/helpers')

/**
 * Handles the viewing of users based on the role of the requester.
 * @param {Object} req - The HTTP request object. Contains the user's email in req.body.
 * @param {Object} res - The HTTP response object. Used to send responses back to the client.
 */
const view = async (req, res) => {
    const { email } = req.body

    try {
        /** 
         * Destructure email and content from the request body, and message ID from the request parameters.
         * @type {string} email - The email of the user.
         */
        const { email } = req.body

        const user = await User.findOne({ email: email })

        if (user.role === "Professor") {
            const users = await User.find()
            res.send(users)
        } else {
            const users = await User.find({ house: user.house })
            res.send(users)
        }


    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }
}

/**
 * Handles the viewing of users Id  based on the role of the requester.
 * @param {Object} req - The HTTP request object. Contains the user's email in req.body.
 * @param {Object} res - The HTTP response object. Used to send responses back to the client.
 */
const viewId = async (req, res) => {
    const { email } = req.body

    try {
        /** 
         * Destructure email and content from the request body, and message ID from the request parameters.
         * @type {string} email - The email of the user.
         * @type {string} id  - the id of the users
         */
        const { email } = req.body
        const { id } = req.params

        const user = await User.findOne({ _id : id })
        const userFind = await User.findOne({ _id : id })


        if (user.role === "Professor" || user.house === userFind.house || user.email === userFind.email)
            res.send(userFind)
        else
            res.status(403).json({ message: "You are not authorized viewing of users" })

    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }
}

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

        const userExists = await User.findOne({
            $or: [{ email: email }, { user_name: user_name }]
        });

        if (userExists) {
            return res.status(400).json({ message: "Email or user Name already in use" })
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

        const passwordIsOk = await comparPwd(password, user.password) // comprae user inpur pasword & data password user
        const datasUser = {
            email: user.email,
            id_user : user._id,
            house : user.house,
            user_name : user.user_name,
            role : user.role
          }

        if (passwordIsOk) {
            const token = createToken(user.user_name) // create de token 
            return res.status(200).json({ code: 200, message: "login successful", datasUser, token ,expire_token : process.env.EXPIRESTOKEN })

        } else {
            return res.status(400).json({ message: "login failed" })
        }


    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }
}

const promoteUser = async (req, res) => {

    /** 
     * Destructure email and content from the request body, and message ID from the request parameters.
     * @type {string} email - The email of the user.
     * @type {string} id  - the id of the users
     */
    const { email } = req.body
    const { id } = req.params

    try {

        const user = await User.findOne({ email: email })
        const userPromote = await User.findOne({ _id : id  })

        if(user.role === "Professor" && userPromote.email != user.email){

            if(userPromote.role === "Professor"){
                res.status(401).json({ message: "This user is already a professor." })
            }
            
            const promote = await User.updateOne(
                { _id: id },
                { $set: { role : 'Professor'} })
                
            res.status(200).json({ message: "This user is a professor." })
        }else{
            res.status(401).json({ message: "You are not authorized" })
        }

        
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }

}

const demoteUser = async (req, res) => {

    /** 
     * Destructure email and content from the request body, and message ID from the request parameters.
     * @type {string} email - The email of the user.
     * @type {string} id  - the id of the users
     */
    const { email } = req.body
    const { id } = req.params

    try {

        const user = await User.findOne({ email: email })
        const userPromote = await User.findOne({ _id : id  })

        if(user.role === "Professor" && userPromote.email != user.email){

            if(userPromote.role === "Student"){
                res.status(401).json({ message: "This user is already a Student." })
            }
            
            const promote = await User.updateOne(
                { _id: id },
                { $set: { role : 'Student'} })
                
            res.status(200).json({ message: "This user is a Student." })
        }else{
            res.status(401).json({ message: "You are not authorized" })
        }

        
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }

}

module.exports = {
    create,
    login,
    view,
    viewId,
    promoteUser,
    demoteUser,
}
