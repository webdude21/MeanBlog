var controllers = require('../controllers');
var AUTHORIZED_PUBLISHER_ROLES = ['admin', 'editor', 'author'];
var AUTHORIZED_PUBLISHER_ROLES_TO_DELETE_ROLES = ['admin', 'editor'];
var auth = require('../config/auth');

module.exports = function (articlesRoute, app) {
    app.route(articlesRoute)
        .get(controllers.articles.all)
        .post(auth.isAuthenticated, auth.isInRole(AUTHORIZED_PUBLISHER_ROLES), controllers.articles.createNew);

    app.route(articlesRoute + ':articleId')
        .get(controllers.articles.getArticleById)
        .put(auth.isAuthenticated, auth.isInRole(AUTHORIZED_PUBLISHER_ROLES), controllers.articles.update)
        .delete(auth.isAuthenticated, auth.isInRole(AUTHORIZED_PUBLISHER_ROLES_TO_DELETE_ROLES),
        controllers.articles.destroy);
};