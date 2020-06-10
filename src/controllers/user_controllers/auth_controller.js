const User = require('../../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../../../config/mongo_config')

const UserController = require('./user_controller')

module.exports = {

    register(req, res) {
        var hashedPassword = bcrypt.hashSync(req.body.password, 8);

        User.create({
            email : req.body.email,
            displayName : req.body.displayName,
            password : hashedPassword
        })
        .then(() => {
            res.status(200).send({Message : "User has been registered"})
        })
        .catch((err) => {
            if(err.name == 'MongoError' && err.code == 11000) {
                res.status(401).send({Error : "This email or display name is already taken."})
            } else {
                res.status(401).send( err )
            }
        })
    },

    login(req, res) {
        User.findOne({email : req.body.email})
        .select('+password')
        .populate('player_character')
        .then((user) => {
            if(!user) {
                res.status(404).send({Error : "User not found"})
            } else {
                var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
                if(!passwordIsValid) {
                    res.status(401).send({Error : 'Login is invalid'})
                } else {
                    if(user.admin == true) {
                        var admintoken = jwt.sign({id : user._id}, "admin", {
                            expiresIn:86400
                        })
                    }
                    var token = jwt.sign({id : user._id}, config.secret, {
                        expiresIn: 86400
                    })
                    console.log({
                        auth: true, 
                        token: token, 
                        userid: user.id, 
                        email: user.email,
                        displayName: user.displayName,
                        scannedQrs: user.scannedQrs,
                        characterModel: user.playerCharacter
                    });
                                      
                    res.status(200).send({
                        auth: true, 
                        token: token, 
                        userid: user.id, 
                        email: user.email,
                        displayName: user.displayName,
                        scannedQrs: user.scannedQrs,
                        characterModel: user.playerCharacter
                    })
                }
            }
        })
    },

    validateToken(req, res, next) {
        if(!req.headers.authorization) {
            return res.status(401).send({Error : 'No token provided'})
        } else {
            let token = req.headers.authorization.split(' ')[1]
            if(token === 'null' || token === null) {
                return res.status(401).send({Error : 'No token provided'})
            } else {
                jwt.verify(token, config.secret, (err, decoded) => {
                    if(err) {
                        return res.status(401).send({Error : 'Invalid token'})
                    } else {
                        if(decoded) next()
                    }
                })
            }
        }
    },

    isTokenStillValid(req, res, next) {
        if(!req.headers.authorization) {
            return res.status(401).send({valid : false, Error : 'No token provided'})
        } else {
            let token = req.headers.authorization.split(' ')[1]
            if(token === 'null' || token === null) {
                return res.status(401).send({valid: false, Error : 'No token provided'})
            } else {
                jwt.verify(token, config.secret, (err, decoded) => {
                    if(err) {
                        console.log(err)
                        return res.status(401).send(err)
                    } if (decoded) {
                        return res.status(200).send({valid: true, Message : 'token is still valid'})
                    }
                })
            }
        }
    },

    checkSpecificUserToken(req, res, next) {
        console.log("we here")
        if(!req.headers.authorization) {
             res.status(401).send({valid : false, Error : 'No token provided'})
        } else {
            let token = req.headers.authorization.split(' ')[1]
            if(token === 'null' || token === null) {
                 res.status(401).send({valid: false, Error : 'No token provided'})
            } else {
                jwt.verify(token, config.secret, (err,decoded) => {
                    if(err) {
                        res.status(401).send({Error : 'token is invalid'})
                    }
                    if(decoded) {
                        if (decoded.id == req.params.id) {
                            next()
                        } else {
                            res.status(401).send({Error : 'You have no permission to view this data.'})
                        }
                    }
                })
            }
        }
    },
    
    validateAdmin(req, res, next) {
        if(!req.headers.admin) {
            return res.status(401).send({Error : 'No admin token provided'})
        } else {
            let admintoken = req.headers.admin.split(' ')[1]
            if(admintoken == 'null' || admintoken == null) {
                res.status(401).send({Error :'No admin token provided'})
            } else {
                jwt.verify(admintoken, "admin", (err, decoded) => {
                    if(err) {
                        res.status(401).send({Error : "Admintoken is invalid"})
                    } 
                    if (decoded) {
                        next()
                    }
                })
            }
        }
    }
}