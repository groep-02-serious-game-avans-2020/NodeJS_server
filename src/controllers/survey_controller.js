const Survey = require('../models/survey')

module.exports = {

    getAll(req, res) {
        Survey.find()
            .then((surveys) => {
                res.status(200).send(surveys)
            })
            .catch((err) => {
                res.status(404).send({ Error: "Surveys not found" })
            })
    },

    getOne(req, res) {
        Survey.findById(req.params.id)
            .then((survey) => {
                res.status(200).send(survey)
            })
            .catch((err) => {
                res.status(404).send({ Error: "Survey not found" })
            })
    },

    create(req, res) {
        Survey.create({
            title: req.body.title,
            questions: req.body.questions
        })
            .then((survey) => {
                res.status(200).send({ Message: "Survey created.", createdSurvey: survey })
            })
            .catch((err) => {
                res.status(401).send({ Error: err })
            })
    },

    // update(req, res) {

    // }

    delete(req, res) {
        Survey.findById(req.params.id)
            .then((survey) => {
                survey.remove()
                res.status(200).send({ Message: "Survey has been removed." })
            })
    }
}