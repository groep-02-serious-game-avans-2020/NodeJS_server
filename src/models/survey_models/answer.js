const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AnswerSchema = new Schema ({

    questionNumber : {
        type : Number,
        required : [true, 'questionNumber is required.']
    },

    numberAnswer : {
        type: Number,
    },

    textAnswer : {
        type: String
    }
})

const Answer = mongoose.model('answer', AnswerSchema)
module.exports = Answer