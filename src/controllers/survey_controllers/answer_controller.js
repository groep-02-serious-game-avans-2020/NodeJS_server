const Answer = require('../../models/survey_models/answer')

module.exports = {

    getAll(req, res) {
        Answer.find()
        .then((answers) => {
            res.status(200).send(answers)
        })
        .catch((err) => {
            res.status(404).send({Error : "Answers not found"})
        })
    },

    getOne(req, res) {
        Answer.findById(req.params.id)
        .then((answer) => {
            res.status(200).send(answer)
        })
        .catch((err) => {
            res.status(404).send({Error : "Answer not found"})
        })
        
    },

    create(req, res) {
        if(!req.body.numberAnswer || req.body.numberAnswer === null) {
            numberAnswerToSet = 0
        } else {
            numberAnswerToSet = req.body.numberAnswer
        }

        if(!req.body.textAnswer || req.body.textAnswer === null) {
            textAnswerToSet = "Not an open question"
        } else {
            textAnswerToSet = req.body.textAnswer
        }

        Answer.create({
            questionNumber : req.body.questionNumber,
            numberAnswer : numberAnswerToSet,
            textAnswer : textAnswerToSet            
        })
        .then(() => {
            res.status(200).send({Message : "Answer has been created"})
        })
        .catch((err) => {
            if(err.name == 'MongoError' && err.code == 11000) {
                res.status(401).send({Error: "this answer already exists"})
            } else {
                res.status(401).send(err)
            }
        })
    },

    // update(req, res) {

    // },

    delete(req, res) {
        Answer.findById(req.params.id)
        .then((answer) => {
            answer.remove()
            res.status(200).send({Message : "Answer has been removed"})
        })
        .catch((err) => {
            res.status(401).send({Error : err})
        })
    }
}