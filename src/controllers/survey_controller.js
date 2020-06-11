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
        console.log(`Survey ${req.params.id} requested`);
        
        Survey.findById(req.params.id)
            .then((survey) => {
                console.log(`Survey ${survey.title} found`);
                res.status(200).send(survey)
            })
            .catch((err) => {
                console.log(`Survey ${req.params.id} not found`);
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
                res.status(400).send(err);
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
    },

    submitAnswers(req, res) {
        const answers = req.body;

        Survey.findById(req.params.id)
            .then((survey) => {
                survey.set({
                    answers: answers
                });

                survey.save()
                    .then(() => {
                        res.status(200).send({ Message: "Answers submitted." });
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(400).send({ Error: "Server error" })
                    });

            })
            .catch((err) => {
                console.log(err);
                res.status(404).send({ Error: "Survey not found" });
            });
    }
}