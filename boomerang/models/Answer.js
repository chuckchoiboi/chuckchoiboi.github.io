const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    questionId: {
        type: mongoose.Types.ObjectId,
        ref: 'Question'
    },
    authorId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    authorUsername: {
        type: String,
    },
    answerBody: {
        type: String,
        required: true,
        maxLength: 200,
    },
    selected: {
        type: Boolean,
        default: false,
    },

}, {
    timestamps: true
}); 

const Answer = mongoose.model( 'Answer', answerSchema );

module.exports = Answer;