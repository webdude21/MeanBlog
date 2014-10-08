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

module.exports.seedInitialComments = function () {
    Comment.find({}).exec(function (err, collection) {
        if (err) {
            console.log('Cannot find comments: ' + err);
            return;
        }

        if (collection.lenght > 0){
            return;
        }

        User.find({}).exec(function (err, users) {
            if (err) {
                console.log(err);
            }

            if (users) {
                users.forEach(function (user) {

                })
            }


            User.find({}).exec(function (err, articles) {
                if (err) {
                    console.log(err);
                }

                if (articles) {
                    articles.forEach(function (article) {
                        users.forEach(function (user) {
                            for (var i = 0; i < sampleComments.length; i++) {
                                Comment.create({body: sampleComments[i], article: article, author: user })
                            }
                        })
                    })
                }
            });


            console.log('Comments added to the database');
        });
    });
};