const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
    name: {
        type: String,
        required: 'Name is required'
    },
    score: {
        type: Number,
        default: 0
    }
})

const Score = mongoose.model('score', ScoreSchema);
module.exports = Score;