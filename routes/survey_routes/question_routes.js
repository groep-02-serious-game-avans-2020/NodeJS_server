const QuestionController = require('../../src/controllers/survey_controllers/question_controller')

module.exports = (app) => {

    //get all questions
    app.get('/api/questions', QuestionController.getAll)

    //get a single question
    app.get('/api/question/:id', QuestionController.getAll)

    //create a new question
    app.post('/api/question', QuestionController.create)

    //delete a question
    app.delete('/api/question/:id', QuestionController.delete)
}