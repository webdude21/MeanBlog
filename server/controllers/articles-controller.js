'use strict';
var mongoose = require('mongoose');
var viewModels = require('../view-models');
var Article = mongoose.model('Article');
var _ = require('lodash');

module.exports = {
    article: function (request, response, next, id) {
        Article.load.populate('author category')(id, function (err, article) {
            if (err) {
                return next(err);
            }
            if (!article) {
                return next(new Error('Failed to load article ' + id));
            }
            request.article = viewModels.ArticleViewModel.getArticleViewModelFromArticle(article);
            next();
        });
    },
    createNew: function (req, res) {
        var article = new Article(req.body);
        article.author = req.user;

        article.save(function (err) {
            if (err) {
                console.log(err);
                return res.json(500, {
                    reason: 'Cannot save the article'
                });
            }
            res.json(article);

        });
    },
    update: function (req, res) {
        var article = req.article;

        article = _.extend(article, req.body);

        article.save(function (err) {
            if (err) {
                return res.json(500, {
                    reason: 'Cannot update the article'
                });
            }
            res.json(article);

        });
    },
    destroy: function (req, res) {
        var article = req.article;

        article.remove(function (err) {
            if (err) {
                return res.json(500, {
                    reason: 'Cannot delete the article'
                });
            }
            res.json(article);

        });
    },
    show: function (req, res) {
        res.json(req.article);
    },
    all: function (req, res) {
        Article.find().sort('-created').populate('author category').exec(function (err, articles) {
            if (err) {
                return res.json(500, {
                    reason: 'Cannot list the articles'
                });
            }

            var resultArticles = [];
            articles.forEach(function (article) {
                resultArticles.push(viewModels.ArticleViewModel.getArticleViewModelFromArticle(article))
            });
            res.json(resultArticles);
        });
    }
};