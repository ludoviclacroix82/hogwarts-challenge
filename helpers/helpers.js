// helpers/helpers
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = parseInt(process.env.LEVEL_HASH_PWD)

/**
 *  Hash the password 
 * @param {*} userPassword - User password non Hashed
 * @saltRounds - Level password [.env LEVEL_HASH_PWD]
 * @returns  - the password hased 
 */
const hashPwd = async (userPassword) => {
    try {
        const hash = await bcrypt.hash(userPassword, saltRounds)
        return hash
    } catch (error) {
        throw new Error('Error hashing password')
    }
}

const comparPwd = async (userPassword, dbpassword) => {

    try {

        const compare = await bcrypt.compare(userPassword, dbpassword)
        if (compare)
            return true
        else
            return false

    } catch (error) {
        throw new Error('Error compare password')
    }
}

const createToken = (user_name) => {
    const token = jwt.sign({ username: user_name }, process.env.SECRETKEY, { expiresIn: '1h' })

    return token
}
const verifyToken = (token) => {
    const decoded = jwt.verify(token, process.env.SECRETKEY)
    console.log(decoded)
    return decoded
}

const authenticateJWT = (req, res, next) => {
    const token = req.header('x-auth-token')
    if (!token) return res.status(401).json({ message: 'Authentication failed' })

    try {
        const decoded = verifyToken(token)
        req.user = decoded
        
        next()
    } catch (error) {
        res.status(400).json({ message: 'Jeton non valide' })
    }
}

module.exports = {
    hashPwd,
    comparPwd,
    createToken,
    authenticateJWT,
}
