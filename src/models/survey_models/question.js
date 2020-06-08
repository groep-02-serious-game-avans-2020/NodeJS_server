const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuestionSchema = new Schema ({

    questionNumber : {
        type : Number,
        required : [true, 'questionNumber is required.']
    },

    question : {
        type: String,
        required : [true, 'question is required']
    },

    //textAnswer = false // ???????? wat moet hiermee
})

const Question = mongoose.model('question', QuestionSchema)
module.exports = Question