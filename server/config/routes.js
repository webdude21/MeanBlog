var routes = require('../routes');
var ARTICLES_ROUTE = '/api/articles/';
var PARTIALS_PATH = '../../public/partials/';
var API_NOT_FOUND_ROUTE = '/api/*';
var USERS_ROUTES = {main: '/api/users', login: '/login', logout: '/logout'};

module.exports = function (app) {
    routes.usersRouting(USERS_ROUTES, app);
    routes.partialsRouting(PARTIALS_PATH, app);
    routes.articlesRouting(ARTICLES_ROUTE, app);
    routes.apiNotFoundRouting(API_NOT_FOUND_ROUTE, app);
    routes.defaultRouting(app);
};