var mongoose = require('mongoose');
var Article = mongoose.model('Article');
var User = mongoose.model('User');
var Category = mongoose.model('Category');

function ArticleViewModel(article) {
    this.title = article.title;
    this.author = {
        username: article.author.username,
        id: article.author._id
    };

    if (article.category){
        this.category = {
            title: article.category.title,
            id: article.category._id
        };
    }
    this.body = article.body;
    this.comments = article.comments;
    this.date = article.date;
    this.meta = article.meta;

    return this;
}

module.exports = {
    getArticleViewModelFromArticle: function (article) {
        return new ArticleViewModel(article);
    }
};