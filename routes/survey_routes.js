const SurveyController = require('../src/controllers/survey_controller');

module.exports = (app) => {

    //get all surveys
    app.get('/api/surveys', SurveyController.getAll)

    //get a single survey
    app.get('/api/survey/:id', SurveyController.getOne)

    //create a survey
    app.post('/api/survey', SurveyController.create)

    //delete a survey
    app.delete('/api/survey/:id', SurveyController.delete)

    //submit answers to survey
    app.put('/api/survey/:id', SurveyController.submitAnswers)

    //submit answers to survey
    //app.get('/api/survey-highscores/:id', SurveyController.getHighScores)
}
