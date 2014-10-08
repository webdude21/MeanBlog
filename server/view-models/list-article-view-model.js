var mongoose = require('mongoose');
var Article = mongoose.model('Article');
var CategoryViewModel = require('./category-simple-view-model');
var User = mongoose.model('User');
var Category = mongoose.model('Category');

function ListArticleViewModel(article) {
    this.id = article._id;
    this.title = article.title;
}

module.exports = {
    getListArticleViewModelFromArticle: function (article) {
        return new ListArticleViewModel(article);
    }
};