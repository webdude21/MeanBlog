'use strict';
meanBlog.controller('ArticleCreateController', function ArticleCreateController($scope, ArticleResource, CategoryResource) {
    $scope.categories = CategoryResource.getAllCategories();
    $scope.createNew = function(article){

    };
});