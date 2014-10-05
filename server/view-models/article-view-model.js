var mongoose = require('mongoose');
var Article = mongoose.model('Article');
var User = mongoose.model('User');
var Category = mongoose.model('Category');

function setCategoryNames(dataCategories, object){
    object.categories = [];
    dataCategories.forEach(function(category){
        object.categories.push(category.title);
    });
}

function ArticleViewModel(article) {
    this.title = article.title;
    this.author = article.author.username;
    setCategoryNames(article.categories, this);
    this.body = article.body;
    this.comments = article.comments;
    this.date = article.date;
    this.meta = article.meta;
}

module.exports = {
    getArticleViewModelFromArticle: function (article) {
        return new ArticleViewModel(article);
    }
};