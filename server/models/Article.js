var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
    title: String,
    author: mongoose.Schema.Types.ObjectId,
    body: String,
    comments: [
        { body: String, date: Date }
    ],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
        votes: Number,
        favs: Number
    }
});

var Article = mongoose.model('Article', articleSchema);
var User = mongoose.model('User');

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
                Article.create({ title: "My first article!", author: user._id, body: "Loren Ipsum goes here!" });
                console.log('Articles added to the database');
            }
        });
    });
};