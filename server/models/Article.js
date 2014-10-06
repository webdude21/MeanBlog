var mongoose = require('mongoose');
var sampleData = require('./sample-data');
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
    }
});

var Article = mongoose.model('Article', articleSchema);

module.exports.seedInitialArticles = function () {
    Article.find({}).exec(function (err, collection) {
        if (err) {
            console.log('Cannot find articles: ' + err);
            return;
        }

        User.findOne(function (err, user) {
            if (err) {
                console.log(err);
            }

            if (collection.length === 0) {
                Article.create({ title: sampleData.title, author: user, body: sampleData.body,
                    mata: {tags: sampleData.tags} });
                console.log('Articles added to the database');
            }
        });
    });
};