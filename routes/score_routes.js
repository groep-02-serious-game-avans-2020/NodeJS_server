const HSController = require('../src/controllers/user_controllers/score_controller');

//Get an ordered list of all current highscores.
app.get('/api/scores', HSController.getScores);

app.post('/api/score', HSController.create)