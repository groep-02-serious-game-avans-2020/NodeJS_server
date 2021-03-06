const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SurveySchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true,
    },
    questions: [{
        questionNumber: {
            type: Number,
            required: true,
            default: 1,
        },
        question: {
            type: String,
            required: true,
        },
        textAnswer: {
            type: Boolean,
            required: true,
            default: false,
        },
    }],
    answers: [{
        questionNumber: {
            type: Number,
            required: true,
        },
        textAnswer: String,
        numberAnswer: Number,
    }],
    highScores: [{
        userName: {
            type: String,
            required: true
        },
        score: {
            type: Number,
            required: true
        }
    }]
});

const Survey = mongoose.model('survey', SurveySchema);

module.exports = Survey;