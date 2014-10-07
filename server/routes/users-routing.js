var auth = require('../config/auth');
var config = require('../config/config');
var controllers = require('../controllers');

module.exports = function (usersRoute, app) {
    app.route(usersRoute.main)
        .get(auth.isInRole(config.identity.roles.admin), controllers.users.getAllUsers)
        .post(controllers.users.createUser)
        .put(auth.isAuthenticated, controllers.users.updateUser);

    app.post(usersRoute.login, auth.login);
    app.post(usersRoute.logout, auth.logout);

    //app.get(usersRoute.edit, auth.isInRole(config.identity.roles.admin), controllers.users.editUser);
    app.get(usersRoute.edit, controllers.users.editUser);
    app.put(usersRoute.edit, controllers.users.updateUserRoles);
};