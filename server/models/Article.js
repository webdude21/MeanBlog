var mongoose = require('mongoose');
var sampleData = require('./article-sample-data');
var User = mongoose.model('User');
var Category = mongoose.model('Category');

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
            type: mongoose.Schema.ObjectId,
            ref: 'Comment'
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

var seedInitialArticles = function () {
    Article.find({}).exec(function (err, collection) {
        if (err) {
            console.log('Cannot find articles: ' + err);
            return;
        }

        User.findOne(function (err, user) {
            if (err) {
                console.log(err);
            }

            Category.findOne(function(err, category){
                if (err) {
                    console.log(err);
                }

                if (collection.length === 0) {
                    sampleData.forEach(function(item){
                        var article = new Article({ title: item.title, comments: [],
                            category: category, author: user, hidden: false,
                            body: item.body, meta: {votes: 0, tags: item.tags}});
                        article.save(function(){
                            category.articles.push(article);
                            category.save();
                        });
                    });

                    console.log('Articles added to the database');
                }
            });
        });
    });
};

module.exports.seedInitialArticles = function () {
    setInterval(seedInitialArticles, 1000);
};