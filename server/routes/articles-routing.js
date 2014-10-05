var controllers = require('../controllers');

module.exports = function(articlesRoute, app){
    app.get(articlesRoute, controllers.articles.all);
};