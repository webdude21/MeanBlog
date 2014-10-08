var mongoose = require('mongoose');
var sampleData = require('./article-sample-data');
var User = mongoose.model('User');


var articleSchema = mongoose.Schema({
    title: String,
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category'
    },
    body: String,
    comments: [
        {
            body: String,
            date: Date
        }
    ],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
        votes: Number,
        tags: [String]
    },
    updates: [
        {
            by: {
                type: mongoose.Schema.ObjectId,
                ref: 'User'
            },
            date: { type: Date, default: Date.now }
        }
    ]
});

var Article = mongoose.model('Article', articleSchema);

module.exports.seedInitialArticles = function () {
    Article.find({}).exec(function (err, collection) {
        if (err) {
            console.log('Cannot find articles: ' + err);
            return;
        }

        User.findOne.exec(function (err, user) {
            if (err) {
                console.log(err);
            }

            if (collection.length === 0) {
                for (var i = 0; i < sampleData.length; i++) {
                    Article.create({ title: sampleData[i].title, author: user, hidden: false, body: sampleData[i].body,
                        meta: {votes: 0, tags: sampleData[i].tags}});
                }
                console.log('Articles added to the database');
            }
        });
    });
};