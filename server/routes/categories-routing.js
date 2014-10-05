var controllers = require('../controllers');

module.exports = function(categoriesRoute, app){
    app.route(categoriesRoute)
        .get(controllers.categories.all);
};