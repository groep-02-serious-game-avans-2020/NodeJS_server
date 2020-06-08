const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email : {
        type: String,
        unique: true,
        required : [true, 'Email is required']
    },
    displayName : {
        type: String,
        unique : true,
        required : [true, 'DisplayName is required']
    },
    admin : {
        type : Boolean,
        default : false
    },
    password: {
        type: String,
        required : [true, 'Password is required'],
        select : false
    },
    scannedQrs : {
        default: []
    }
})

const User = mongoose.model('user', UserSchema)
module.exports = User