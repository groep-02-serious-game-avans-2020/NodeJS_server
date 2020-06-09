const Score = require('../../models/highscore_entry')

function getScores(req, res) {
    Score.find({}, {_id: 0, __v: 0})
    .sort({score: -1})
    .limit(10)
    .then(scores => {
        res.status(200).send(scores)
    })
}

function create(req, res) {
    Score.create(req.body)
    .then(newScore => {
        res.status(200).send(newScore)
    })
}

module.exports = {
    getScores,
    create
}