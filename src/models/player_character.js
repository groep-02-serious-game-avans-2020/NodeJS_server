const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PlayerCharacterSchema = new Schema({
    skin: {
        type: String,
        required: true,
        default: 'Skin_01',
    },
    shirt: {
        type: String,
        required: true,
        default: 'Shirt_01',
    },
    pants: {
        type: String,
        required: true,
        default: 'Pants_01',
    },
    shoes: {
        type: String,
        required: true,
        default: 'Shoes_01',
    },
    eye: {
        type: String,
        required: true,
        default: 'Eye_01',
    },
})

const PlayerCharacter = mongoose.model('player_character', PlayerCharacterSchema);
module.exports = {PlayerCharacter, PlayerCharacterSchema};