const Message = require('../models/MessageModel')
const User = require('../models/UserModel')



const create = async (req, res) => {

   const { content, email } = req.body
   try {
      const user = await User.findOne({ email: email })

      const message = new Message({ content, author_id: user._id, house: user.house })
      message.save()

      res.status(200).json({ message: "Sent message successfully" })

   } catch (error) {
      res.status(500).json({ message: "An error occurred" })
      console.log(error);
      
   }

}

module.exports = {
   create,
}