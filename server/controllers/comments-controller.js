'use strict';
var mongoose = require('mongoose');
var viewModels = require('../view-models');
var Comment = mongoose.model('Comment');
var PAGE_SIZE = 10;
var MeanGridView = require("../utilities/mean-grid-view");

function commentsQuery(baseQuery, orderType, by, page, res) {
    baseQuery
        .populate('author article')
        .sort(orderType + by)
        .skip((page - 1) * PAGE_SIZE)
        .limit(PAGE_SIZE)
        .exec(function (err, comments) {
            if (err) {
                return res.status(400).json({reason: 'Cannot list the comments'});
            } else {

            }

            var resultComments = [];
            comments.forEach(function (comment) {
                resultComments.push(viewModels.CommentViewModel.getCommentViewModelFromComment(comment));
            });
            res.json(resultComments);
        });
}

module.exports = {
    getAllComments: function (req, res) {
        MeanGridView.populateResponse(req, res, Comment, 'author article', 10, viewModels.CommentViewModel.getCommentViewModelFromComment);
    },
    all: function (req, res) {
        var page = parseInt(req.query['page']) || 1;
        var by = req.query['orderBy'] || 'date';
        var orderType = req.query['orderType'] == 'true' ? '-' : '';
        var author = req.query['author'] || null;
        var article = req.query['article'] || null;

        if (page < 1) {
            page = 1;
        }

        var baseQuery = Comment.find();
        var queryWithAuthor = Comment.find()
            .where('author').equals(author);
        var queryWithArticle = Comment.find()
            .where('article').equals(article);
        var queryWithAuthorAndArticle = Comment.find()
            .where('article').equals(article).where('author').equals(author);

        if (author) {
            if (article) {
                commentsQuery(queryWithAuthorAndArticle, orderType, by, page, res);
            } else {
                commentsQuery(queryWithAuthor, orderType, by, page, res);
            }
        } else {
            if (article) {
                commentsQuery(queryWithArticle, orderType, by, page, res);
            } else {
                commentsQuery(baseQuery, orderType, by, page, res);
            }
        }
    },
    update: function (req, res) {
        var updatedComment = req.body;
        Comment.findById(updatedComment.id).exec(function (err, comment) {
            if (err) {
                return res.status(400).json({reason: 'Cannot find an comment with such id'});
            }
            if (!comment) {
                return res.status(400).json({reason: 'Cannot find an comment with such id'});
            }

            if (req.user._id.id != comment.author.id) {
                return res.status(400).json({reason: 'You are not allowed to edit this comment'});
            }

            comment.body = updatedComment.body;

            comment.save(function (err) {
                if (err) {
                    return res.status(400).json({reason: 'Cannot update the comment'});
                }
                res.json(comment);
            });
        });
    },
    destroy: function (req, res) {
        Comment.findById(req.params.commentId).exec(function (err, comment) {
            if (err) {
                return res.status(400).json({reason: 'Cannot find an comment with such id'});
            }
            if (!comment) {
                return res.status(400).json({reason: 'Cannot find an comment with such id'});
            }

            if (req.user._id.id != comment.author.id && req.user.roles.indexOf('admin') === -1) {
                return res.status(400).json({reason: 'You are not allowed to delete this comment'});
            }

            comment.remove(function (err) {
                if (err) {
                    return res.status(400).json({reason: 'Cannot delete the comment'});
                }
                res.json(comment);
            });
        });
    },
    createNew: function (req, res) {
        var comment = new Comment(req.body);
        comment.author = req.user;

        comment.save(function (err) {
            if (err) {
                console.log(err);
                return res.status(400).json({reason: 'Cannot save the comment'});
            }
            res.json(comment);
        });
    },
    getCommentById: function (req, res) {
        Comment.findById(req.params.commentId).populate('author article')
            .exec(function (err, comment) {
                if (err) {
                    return res.status(400).json({reason: 'Cannot find an comment with such id'});
                }
                if (!comment) {
                    return res.status(400).json({reason: 'Cannot find an comment with such id'});
                }

                res.json(viewModels.CommentViewModel.getCommentViewModelFromComment(comment));
            });
    }
};