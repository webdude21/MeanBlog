var mongoose = require('mongoose');
var viewModels = require('../view-models');
var Category = mongoose.model('Category');
var CANNOT_LIST_CATEGORIES = 'Cannot list the categories';

module.exports = {
    all: function (request, response) {
        Category.find().exec(function (error, results) {
            if (error) {
                return response.json(500, {
                    reason: CANNOT_LIST_CATEGORIES
                });
            }

            var resultCategories = [];
            results.forEach(function (category) {
                resultCategories.push(viewModels.CategorySimpleViewModel.getCategorySimpleViewModelFromCategory(category))
            });
            response.status(200).json(resultCategories);
        });
    },

    getCategoryById: function (request, response) {
        Category.find({_id: request.params.categoryId}).exec(function (error, result) {
            if (error) {
                response.status(500).json({reason: CANNOT_LIST_CATEGORIES});
            } else {
                response.status(200).json(result);
            }
        });
    },

    createNew: function (request, response) {

    },

    update: function (request, response) {

    },

    destroy: function (request, response) {

    }
};