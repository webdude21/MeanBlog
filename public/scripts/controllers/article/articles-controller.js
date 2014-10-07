'use strict';
meanBlog.controller('ArticlesController', function ArticlesController($scope, CategoryResource, identity, ArticleResource) {
    $scope.identity = identity;
    $scope.categories = CategoryResource.getAllCategories();
    $scope.articles = ArticleResource.query();
});