var controllers = require('../controllers');

module.exports = function (articlesRoute, app) {
    app.route(articlesRoute)
        .get(controllers.articles.all)
        .post(auth.isInRole('admin'), controllers.users.createUser)
};