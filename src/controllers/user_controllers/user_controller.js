const User = require('../../models/user')

module.exports = {

    getAll(req,res) {
        User.find({})
        .then(users => {
            res.status(200).send(users)
        })
        .catch((err) => {
            res.status(404).send({Error: "Users not found"})
        })
    },

    getOne(req,res) {
        User.findById(req.params.id)
        .then((user) => {
            res.status(200).send(user)
        })
        .catch((error) => {
            res.status(404).send({Error : "User not found"})
        })
    },

    remove(req, res) {
        User.findById(req.params.id)
        .then((user) => {
            user.remove();
            res.status(200).send({Message : "User has been removed"})
        })
        .catch((user) => {
            res.status(401).send({Error: "User was not found"})
        })
    }
}