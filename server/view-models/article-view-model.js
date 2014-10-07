var mongoose = require('mongoose');
var Article = mongoose.model('Article');
var CategoryViewModel = require('./category-simple-view-model');
var User = mongoose.model('User');
var Category = mongoose.model('Category');

function ArticleViewModel(article) {
    this.id = article._id;
    this.title = article.title;
    this.author = {
        username: article.author.username,
        id: article.author._id
    };

    if (article.category) {
        this.category = CategoryViewModel.getCategorySimpleViewModelFromCategory(article.category);
    }

    this.body = article.body;
    this.hidden = article.hidden;
    this.comments = article.comments;
    this.date = article.date;
    this.meta = article.meta;
    this.updates = [];
    var that = this;
    article.updates.forEach(function (update) {
        that.updates.push({
            by: { username: update.by.username, id: update.by._id },
            date: update.date
        })
    });

    return this;
}

module.exports = {
    getArticleViewModelFromArticle: function (article) {
        return new ArticleViewModel(article);
    }
};