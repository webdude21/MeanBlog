var controllers = require('../controllers');
var AUTHORIZED_PUBLISHER_ROLES = ['admin', 'editor', 'author'];
var auth = require('../config/auth');

module.exports = function (categoriesRoute, app) {
    app.route(categoriesRoute)
        .get(controllers.categories.all)
        .post(auth.isAuthenticated, auth.isInRole(AUTHORIZED_PUBLISHER_ROLES), controllers.categories.createNew);

    app.route(categoriesRoute + ':categoryId')
        .get(controllers.categories.getCategoryById)
        .put(auth.isAuthenticated, auth.isInRole(AUTHORIZED_PUBLISHER_ROLES), controllers.categories.update)
        .delete(auth.isAuthenticated, auth.isInRole(AUTHORIZED_PUBLISHER_ROLES), controllers.categories.destroy);
};