const UserController = require('../src/controllers/user_controllers/user_controller');
const AuthController = require('../src/controllers/user_controllers/auth_controller');

module.exports = (app) => {

    //get a list of users
    app.get('/api/users', UserController.getAll)

    //get a single user
    app.get('/api/user/:id', AuthController.checkSpecificUserToken, UserController.getOne)

    //check token is valid
    app.post('/api/check-token', AuthController.isTokenStillValid)

    //register a new user
    app.post('/api/user', AuthController.register)

    //login a user
    app.post('/api/user/login', AuthController.login)

    //remove a user
    app.delete('/api/user/:id', UserController.remove)


}