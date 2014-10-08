var mongoose = require('mongoose');
var viewModels = require('../view-models');
var Category = mongoose.model('Category');
var CANNOT_LIST_CATEGORIES = 'Cannot list the categories';

module.exports = {
    all: function (request, response, next) {
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
            response.json(200, resultCategories);
        });
    },

    getCategoryById: function (request, response) {
        // Category.find().where({_id: request.params.cat.categoryId});
    },

    createNew: function (request, response) {

    },

    update: function (request, response) {

    },

    destroy: function (request, response) {

    }
};