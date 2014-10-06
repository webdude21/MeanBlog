var mongoose = require('mongoose');
var Article = mongoose.model('Article');

var categorySchema = mongoose.Schema({
    title: { type: String, required: true, unique: true },
    articles: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Article'
    }],
    hidden: Boolean,
    date: { type: Date, default: Date.now }
});

var Category = mongoose.model('Category', categorySchema);

module.exports.seedInitialCategories = function () {
    Category.find({}).exec(function (err, collection) {
        if (err) {
            console.log('Cannot find category: ' + err);
            return;
        }

        Article.findOne(function (err, article) {
            if (err) {
                console.log(err);
            }

            if (collection.length === 0) {
                Category.create({ title: "Technologies", articles: [article]});
                console.log('Categories added to the database');
            }
        });
    });
};