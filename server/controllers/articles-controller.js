'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var viewModels = require('../view-models');
var Article = mongoose.model('Article');
var _ = require('lodash');

/**
 * Find article by id
 */
exports.article = function (request, response, next, id) {
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
};

/**
 * Create an article
 */
exports.create = function (req, res) {
    var article = new Article(req.body);
    article.author = req.user;

    article.save(function (err) {
        if (err) {
            return res.json(500, {
                error: 'Cannot save the article'
            });
        }
        res.json(article);

    });
};

/**
 * Update an article
 */
exports.update = function (req, res) {
    var article = req.article;

    article = _.extend(article, req.body);

    article.save(function (err) {
        if (err) {
            return res.json(500, {
                error: 'Cannot update the article'
            });
        }
        res.json(article);

    });
};

/**
 * Delete an article
 */
exports.destroy = function (req, res) {
    var article = req.article;

    article.remove(function (err) {
        if (err) {
            return res.json(500, {
                error: 'Cannot delete the article'
            });
        }
        res.json(article);

    });
};

/**
 * Show an article
 */
exports.show = function (req, res) {
    res.json(req.article);
};

/**
 * List of Articles
 */
exports.all = function (req, res) {
    Article.find().sort('-created').populate('author category').exec(function (err, articles) {
        if (err) {
            return res.json(500, {
                error: 'Cannot list the articles'
            });
        }

        var resultArticles = [];
        articles.forEach(function (article) {
            resultArticles.push(viewModels.ArticleViewModel.getArticleViewModelFromArticle(article))
        });
        res.json(resultArticles);

    });
};