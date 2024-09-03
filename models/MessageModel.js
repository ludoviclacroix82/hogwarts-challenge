
const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    content : {
        type: String,
        required: true
    },
    author_id :{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    house: {
        type: String,
        required: true
    },
    created_at: { 
        type: Date, 
        default: Date.now 
    }
})

module.exports = mongoose.model('Message', UserSchema, 'messages');