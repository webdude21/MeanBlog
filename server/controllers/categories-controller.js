var mongoose = require('mongoose');
var viewModels = require('../view-models');
var Category = mongoose.model('Category');
var CANNOT_LIST_CATEGORIES = 'Cannot list the categories',
    CANNOT_CREATE_CATEGORIES = 'Cannot create category';

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
        Category.create(request.body, function (error, result) {
            if (error) {
                response.status(500).json({reson: CANNOT_CREATE_CATEGORIES});
            } else {
                response.status(201).json(result);
            }
        });
    },

    update: function (request, response) {
        Category.findById(request.body.id).exec(function (error, category) {
            if (error) {
                response.status(500).json({reason: CANNOT_LIST_CATEGORIES});
            } else {
                category.title = request.body.title;
                category.date = request.body.date;
                category.save(function (error) {
                    if (error) {
                        response.status(500).json({reason: CANNOT_CREATE_CATEGORIES});
                    } else {
                        response.status(200).json({});
                    }
                });
            }
        });
    }
};