var controllers = require('../controllers');
var AUTHORIZED_PUBLISHER_ROLES = ['admin', 'editor', 'author'];
var auth = require('../config/auth');

module.exports = function (commentsRoute, app) {
    app.route(commentsRoute)
        .get(controllers.comments.all)
        //.post(controllers.comments.getAllComments)
        .post(auth.isAuthenticated, controllers.comments.createNew);

    app.route(commentsRoute + ':commentId')
        .get(controllers.comments.getCommentById)
        .put(auth.isAuthenticated, controllers.comments.update)
        .delete(auth.isAuthenticated, controllers.comments.destroy);

    app.post("/api/gridComments", controllers.comments.getAllComments)
};