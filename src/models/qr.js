const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QRSchema = new Schema ({

    code: {
        type: String,
        required : [true, "code is required"]
    },

    survey : {
        type: Schema.Types.ObjectId,
        ref : 'survey'
    }

})

const QRCode = mongoose.model('qrcode', QRSchema)
module.exports = QRCode