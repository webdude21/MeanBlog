var auth = require('../config/auth');
var controllers = require('../controllers');

module.exports = function (usersRoute, app) {
    app.route(usersRoute.main)
        .get(auth.isInRole('admin'), controllers.users.getAllUsers)
        .post(controllers.users.createUser)
        .put(auth.isAuthenticated, controllers.users.updateUser);

    app.post(usersRoute.login, auth.login);
    app.post(usersRoute.logout, auth.logout);
};