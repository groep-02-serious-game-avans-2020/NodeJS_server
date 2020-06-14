const Survey = require('../models/survey')
const User = require('../models/user')

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
        const answers = req.body.answers;

        Survey.findById(req.params.id)
            .then((survey) => {
                answers.forEach(answer => {
                    survey.answers.push(answer);
                });
                survey.highScores.push({
                    userName: req.body.userName,
                    score: req.body.highScore
                });

                survey.save()
                    .then(() => {
                        User.findById(req.body.userId)
                            .then((user) => {
                                user.scannedQrs.push(req.params.id);
                                user.save()
                                    .then(() => {
                                        console.log(survey.highScores);
                                        res.status(200).send(survey.highScores);
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                        res.status(400).send({ Error: "Server error" })
                                    });
                            })
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
    },
}