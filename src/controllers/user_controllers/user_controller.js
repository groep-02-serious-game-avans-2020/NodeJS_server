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
        console.log("We also here")
        console.log(req.params.id)
        User.findById(req.params.id)
        .then((user) => {
            console.log(user)
            return res.status(200).send(user)
        })
        .catch((error) => {
            return res.status(404).send({Error : "User not found"})
        })
    },

    getSingleUser(id) {
        User.findById(id)
        .then((user) => {
            return user
        })
        .catch((error) => {
            return null
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