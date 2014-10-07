'use strict';
meanBlog.controller('CategoriesController', function CategoriesController($scope, CategoryResource, identity) {
    $scope.identity = identity;
    $scope.categories = CategoryResource.getAllCategories();
});