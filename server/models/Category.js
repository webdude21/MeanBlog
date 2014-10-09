var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
    title: { type: String, required: true, unique: true },
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

        if (collection.length === 0) {
            Category.create({ title: "Technologies", articles: []});
            console.log('Categories added to the database');
        }
    });
};