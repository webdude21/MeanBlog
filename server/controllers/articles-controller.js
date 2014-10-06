'use strict';
var mongoose = require('mongoose');
var viewModels = require('../view-models');
var Article = mongoose.model('Article');
var _ = require('lodash');

module.exports = {
    getArticleById: function (req, res) {
        Article.findById(req.params.articleId).populate('author category').exec(function (err, article) {
            if (err) {
                return res.status(400).json({reason: 'Cannot find an article with such id'});
            }
            if (!article) {
                return res.status(400).json({reason: 'Cannot find an article with such id'});
            }

            res.json(viewModels.ArticleViewModel.getArticleViewModelFromArticle(article));
        });
    },
    createNew: function (req, res) {
        var article = new Article(req.body);
        article.author = req.user;

        article.save(function (err) {
            if (err) {
                console.log(err);
                return res.status(400).json({reason: 'Cannot save the article'});
            }
            res.json(article);
        });
    },
    update: function (req, res) {
        var updatedArticle = req.body;
        Article.findById(updatedArticle.id).exec(function(err, article){
            if (err) {
                return res.status(400).json({reason: 'Cannot find an article with such id'});
            }
            if (!article) {
                return res.status(400).json({reason: 'Cannot find an article with such id'});
            }

            article.title = updatedArticle.title;
            article.body = updatedArticle.body;
            article.meta.tags = updatedArticle.meta.tags;
            article.category = updatedArticle.category;
            article.updates.push({
                by: req.user
            });

            article.save(function (err) {
                if (err) {
                    return res.status(400).json({reason: 'Cannot update the article'});
                }
                res.json(article);
            });
        });
    },
    destroy: function (req, res) {
        var article = req.article;

        article.remove(function (err) {
            if (err) {
                return res.status(400).json({reason: 'Cannot delete the article'});
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
                return res.status(400).json({reason: 'Cannot list the articles'});
            }

            var resultArticles = [];
            articles.forEach(function (article) {
                resultArticles.push(viewModels.ArticleViewModel.getArticleViewModelFromArticle(article))
            });
            res.json(resultArticles);
        });
    }
};