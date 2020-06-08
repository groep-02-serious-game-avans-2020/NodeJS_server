const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SurveySchema = new Schema ({

    title : {
        type: String,
        required : [true, 'Title of survey is required']
    },

    questions : [{
        type : Schema.Types.ObjectId,
        ref : 'question'
    }],

    answers : [{
        type: Schema.Types.ObjectId,
        ref : 'answer'
    }]

})


const Survey = mongoose.model('survey', SurveySchema)
module.exports = Survey