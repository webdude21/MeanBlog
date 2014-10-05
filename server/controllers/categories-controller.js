var mongoose = require('mongoose');
var viewModels = require('../view-models');
var Category = mongoose.model('Category');

module.exports = {
    all: function (req, res) {
        Category.find().exec(function (err, category) {
            if (err) {
                return res.json(500, {
                    reason: 'Cannot list the categories'
                });
            }

            var resultCategories = [];
            category.forEach(function (article) {
                resultCategories.push(viewModels.CategorySimpleViewModel.getCategorySimpleViewModelFromCategory(article))
            });
            res.json(resultCategories);
        });
    }
};