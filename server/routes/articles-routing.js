var controllers = require('../controllers');
var AUTHORIZED_PUBLISHER_ROLES = ['admin','editor','contributor'];
var auth = require('../config/auth');

module.exports = function (articlesRoute, app) {
    app.route(articlesRoute)
        .get(controllers.articles.all)
        .post(auth.isInRole(AUTHORIZED_PUBLISHER_ROLES), controllers.articles.createNew)
};