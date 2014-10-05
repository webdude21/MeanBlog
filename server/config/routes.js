var routes = require('../routes');
var articlesRoutes = '/api/articles/';
var partialsPath = '../../public/partials/';
var apiNotFoundRoute = '/api/*';
var usersRoutes = {main: '/api/users', login: '/login', logout: '/logout'};

module.exports = function (app) {
    routes.usersRouting(usersRoutes, app);
    routes.partialsRouting(partialsPath, app);
    routes.articlesRouting(articlesRoutes, app);
    routes.apiNotFoundRouting(apiNotFoundRoute, app);
    app.get('*', function (req, res) {
        res.render('index', {currentUser: req.user});
    });
};