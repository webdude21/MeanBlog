var mongoose = require('mongoose');
var Category = mongoose.model('Category');

function CategorySimpleViewModel(category) {
    this.title = category.title;
    this.id = category._id;
    return this;
}

module.exports = {
    getCategorySimpleViewModelFromCategory: function (category) {
        return new CategorySimpleViewModel(category);
    }
};