'use strict';
meanBlog.controller('ArticleDetailController',
    function ArticleDetailController($scope, $routeParams, ArticleResource, CategoryResource) {
    $scope.article = ArticleResource.getById($routeParams.id)
});