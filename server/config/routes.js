var auth = require('./auth');
var controllers = require('../controllers');
var usersRoute = '/api/users';
var articlesRoute = '/api/articles/';

module.exports = function (app) {
    app.route(usersRoute)
        .get(auth.isInRole('admin'), controllers.users.getAllUsers)
        .post(controllers.users.createUser)
        .put(auth.isAuthenticated, controllers.users.updateUser);

    app.get('/partials/:partialArea/:partialName', function (req, res) {
        res.render('../../public/partials/' + req.params.partialArea + '/' + req.params.partialName)
    });

    app.get(articlesRoute, controllers.articles.all);

    app.post('/login', auth.login);
    app.post('/logout', auth.logout);

    app.get('/api/*', function (req, res) {
        res.status(404);
        res.end();
    });

    app.get('*', function (req, res) {
        res.render('index', {currentUser: req.user});
    });
};