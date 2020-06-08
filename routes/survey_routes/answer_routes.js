const AnswerController = require('../../src/controllers/survey_controllers/answer_controller')

module.exports = (app) => {

    //get all answers
    app.get('/api/answers', AnswerController.getAll)

    //get a single answer
    app.get('/api/answer/:id', AnswerController.getOne)

    //create a new answer
    app.post('/api/answer', AnswerController.create)

    //remove an answer
    app.delete('/api/answer/:id', AnswerController.delete)
}