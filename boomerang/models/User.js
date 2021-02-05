const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
    },
    username: {
        type: String,
        unique: true,
        minLength: 5,
        maxLength: 12
    },
    avatarUrl: {
        type: String,
    },
    questionsAsked: {
        type: Number,
        default: 0
    },
    answersSelected: {
        type: Number,
        default: 0
    },
    googleId: String,
}, {
    timestamps: true
}); 

const User = mongoose.model( 'User', userSchema );

module.exports = User;