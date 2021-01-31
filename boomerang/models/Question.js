const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    questionTitle: {
        type: String,
        required: true,
        maxLength: 60
    },
    questionBody: {
        type: String,
        required: true,
    },
    topics: {
        type: [String],
        enum: ['education', 'game', 'entertainment', 'art', 'lifestyle', 'health', 'politics', 'finance', 'travel', 'sports', 'shopping']
    },

}, {
    timestamps: true
}); 

const Question = mongoose.model( 'Question', questionSchema );

module.exports = Question;