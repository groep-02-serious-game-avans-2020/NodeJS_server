const QRCode = require('../models/qr')
const User = require('../models/user')

module.exports = {

    getAll(req, res) {
        QRCode.find({})
        .then(codes => {
            res.status(200).send(codes)
        })
        .catch((err) => {
            res.status(404).send({ Error: "Codes not found" })
        })
    },

    startSurvey(req, res) {
        const user = User.findById(req.body.userid)
        const qr = QRCode.findOne(req.body.qrId)

        if(!qr || qr === null) {
            res.status(401).send({Error : "QR code not found"})
        } else {
            user.scannedQrs = user.scannedQrs += qr._id;
            console.log(qr.survey)
            user.save()
            res.status(200).send({Message : "QR code saved to user"})
        }
    }
}