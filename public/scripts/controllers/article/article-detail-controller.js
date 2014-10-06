'use strict';
meanBlog.controller('ArticleDetailController',
    function ArticleDetailController($scope, $routeParams, ArticleResource) {
    $scope.article = ArticleResource.getById({id: $routeParams.id});
    console.log($scope.article);
});