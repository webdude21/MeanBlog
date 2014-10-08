var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');

function CommentViewModel(comment) {
    this.id = comment._id;
    this.body = comment.body;
    this.author = {
        username: comment.author.username,
        id: comment.author._id
    };
    this.article = {
        title: comment.article.title,
        id: comment.article._id
    };
    this.hidden = comment.hidden;
    this.date = comment.date;
    return this;
}

module.exports = {
    getCommentViewModelFromComment: function (comment) {
        return new CommentViewModel(comment);
    }
};