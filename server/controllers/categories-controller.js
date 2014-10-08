var mongoose = require('mongoose');
var viewModels = require('../view-models');
var Category = mongoose.model('Category');
var CANNOT_LIST_CATEGORIES = 'Cannot list the categories';

module.exports = {
    all: function (req, res) {
        Category.find().exec(function (err, category) {
            if (err) {
                return res.json(500, {
                    reason: CANNOT_LIST_CATEGORIES
                });
            }

            var resultCategories = [];
            category.forEach(function (article) {
                resultCategories.push(viewModels.CategorySimpleViewModel.getCategorySimpleViewModelFromCategory(article))
            });
            res.json(resultCategories);
        });
    },
    getCategoryById: function (req, res) {

    },
    createNew: function (req, res) {

    },
    update: function (req, res) {

    },
    destroy: function (req, res) {

    }
};