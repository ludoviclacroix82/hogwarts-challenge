const { getMaxListeners } = require('events')
const Message = require('../models/MessageModel')
const User = require('../models/UserModel')

/**
 * visualization of the message according to the user's house
 * @param {Object} req - The HTTP request object. Contains user details in req.body.
 * @param {Object} res - The HTTP response object. Used to send responses back to the client.
 */
const view = async (req, res) => {

   /** 
    * @type {string} email - The email of the user.
    */
   const { email } = req.body
   const { house } = req.params

   try {
      const user = await User.findOne({ email: email })
      let messages

      if (user.role != 'Professor') {

         if (house === user.house) {
            messages = await Message
               .find({ house: user.house })
               .sort({ created_at: -1 })
         } else {
            res.status(401).json({ message: "You are not part of this house." })
         }

      } else {
         messages = await Message
            .find({ house: house })
            .sort({ created_at: -1 })
      }

      res.send(messages)


   } catch (error) {
      res.status(500).json({ message: "An error occurred" })
   }

}
/**
 * Visualization of the message with ID according to the user's house.
 * @param {Object} req - The HTTP request object. Contains user details in req.body.
 * @param {Object} res - The HTTP response object. Used to send responses back to the client.
 */
const viewId = async (req, res) => {

   /** 
    * @type {string} email - The email of the user.
    * @type {string} id - The ID of the message to be edited.
    */
   const { email } = req.body
   const { id } = req.params

   try {
      const user = await User.findOne({ email : email })
      const message = await Message.findOne({ _id: id })


      if (message) {
         if (user.id != message.author_id)
            res.status(403).json({ message: "You are not authorized to view this message" })
         else
            res.send(message)

      } else {
         res.status(400).json({ message: "Message No found" })
      }

   } catch (error) {
      res.status(500).json({ message: "An error occurred" })
   }

}

/**
 * creation of a message
 * @param {Object} req - The HTTP request object. Contains user details in req.body.
 * @param {Object} res - The HTTP response object. Used to send responses back to the client.
 */
const create = async (req, res) => {

   /** 
    * @type {string} email - The email of the user.
    * @type {string} content - The new content for the message.
    */
   const { content, email, house } = req.body

   try {
      const user = await User.findOne({ email: email })

      if (user.role === 'Professor')
         message = new Message({ content, author_id: user._id, author: user.user_name, house: house })
      else
         message = new Message({ content, author_id: user._id, author: user.user_name, house: user.house })

      message.save()

      res.status(201).json({ message: "Sent message successfully" })

   } catch (error) {
      res.status(500).json({ message: "An error occurred" })
   }

}


/**
 * Edits a message.
 * @param {Object} req - The HTTP request object. Contains user details in req.body.
 * @param {Object} res - The HTTP response object. Used to send responses back to the client.
 */
const edit = async (req, res) => {

   /** 
    * Destructure email and content from the request body, and message ID from the request parameters.
    * @type {string} email - The email of the user.
    * @type {string} content - The new content for the message.
    * @type {string} id - The ID of the message to be edited.
    */
   const { email, content } = req.body
   const { id } = req.params

   try {

      const user = await User.findOne({ email : email })
      const message = await Message.findOne({ _id: id })

      if (message) {
         if (String(message.author_id) != String(user._id))
            res.status(403).json({ message: "You are not authorized to view this message" })

         const updateMessage = await Message.updateOne(
            { _id: id },
            { $set: { content: content, updated_at: new Date() } })
         res.status(200).json({ message: "Edit Message successfully" })

      } else {
         res.status(400).json({ message: "Message No found" })
      }

   } catch (error) {
      res.status(500).json({ message: "An error occurred" })
   }
}

/**
 * Delete a message.
 * @param {Object} req - The HTTP request object. Contains user details in req.body.
 * @param {Object} res - The HTTP response object. Used to send responses back to the client.
 */
const del = async (req, res) => {

   /** 
   * Destructure email and content from the request body, and message ID from the request parameters.
   * @type {string} email - The email of the user.
   * @type {string} id - The ID of the message to be edited.
   */
   const { email } = req.body
   const { id } = req.params

   try {

      const user = await User.findOne({ email })
      const message = await Message.findOne({ _id: id })

      if (message) {
         if (user.role === "Professor") {

            const deleteMessage = await Message.deleteOne({ _id: id })
            res.status(200).json({ message: "Message deleted successfully" })

         } else {
            res.status(403).json({ message: "You are not authorized to delete this message" })
         }

      } else {
         res.status(400).json({ message: "Message No found" })
      }

   } catch (error) {
      res.status(500).json({ message: "An error occurred" })
   }
}

module.exports = {
   create,
   view,
   viewId,
   edit,
   del,
}