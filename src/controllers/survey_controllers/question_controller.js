const Question = require('../../models/survey_models/question')

module.exports = {

    getAll(req, res) {
        Question.find()
        .then((questions) => {
            res.status(200).send(questions)
        })
        .catch((err) => {
            res.status(404).send({Error : "Questions not found"})
        })
    },

    getOne(req, res) {
        Question.findById(req.params.id)
        .then((question) => {
            res.status(200).send(question)
        })
        .catch((err) => {
            res.status(404).send({Error : "Question not found"})
        })
    },

    create(req, res) {
        Question.create({
            questionNumber : req.body.questionNumber,
            question : req.body.question
            //textanswer boolean? zie schema/model
        })
        .then((question) => {
            res.status(200).send({Message : "Question created", createdQuestion : question})
        })
        .catch((err) => {
            res.status(401).send(err)
        })
    },

    // update(req, res) {

    // },

    delete(req, res) {
        Question.findById(req.params.id)
        .then((question) => {
            question.remove()
            res.status(200).send({Message : "Question has been removed"})
        })
        .catch((err) => {
            res.status(401).send({Error: err})
        })
    },
}