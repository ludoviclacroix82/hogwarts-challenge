// models/UserModel

const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    user_name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    house: {
        type: String,
        required: true,
        enum: ['Gryffondor', 'Hufflepuff', 'Ravenclaw', 'Slytherin']
    },
    role:{
        type: String,
        required: true,
        default: 'Student',
        enum: ['Student', 'Professor']},
    created_at: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('User', UserSchema, 'users');
