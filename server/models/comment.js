var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    body: { type: String, required: true },
    article: {
        type: mongoose.Schema.ObjectId,
        ref: 'Article'
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    hidden: Boolean,
    date: { type: Date, default: Date.now }
});

var Comment = mongoose.model('Comment', commentSchema);
var User = mongoose.model('User');
var Article = mongoose.model('Article');

var sampleComments = ['Ибасиму и якия сйат', 'Фостата коври', 'Вокесн домнер на остата ит', 'Жики ит ли си?',
    'Само лодокорец!', 'Без расисан!', 'Джабасрипт'];

var seedInitialComments = function () {
    Comment.find({}).exec(function (err, collection) {
        if (err) {
            console.log('Cannot find comments: ' + err);
            return;
        }

        User.find({}).exec(function (err, users) {
            if (err) {
                console.log(err);
            }

            Article.find({}).exec(function (err, articles) {
                if (err) {
                    console.log(err);
                }

                if (collection.length === 0) {
                    articles.forEach(function (article) {
                        users.forEach(function (user) {
                            sampleComments.forEach(function (commentBody) {
                              var comment = Comment({body: commentBody, article: article, author: user });
                              comment.save(function(){
                                  article.comments.push(comment);
                                  article.save(function (){});
                              });
                            });
                        })
                    });
                    console.log('Comments added to the database');
                }
            });
        });
    });
};

module.exports.seedInitialComments = function(){
    setTimeout(seedInitialComments, 2000);
};