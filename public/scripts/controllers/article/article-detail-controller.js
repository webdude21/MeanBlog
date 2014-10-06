'use strict';
meanBlog.controller('ArticleDetailController',
    function ArticleDetailController($scope, identity, $routeParams, ArticleResource) {
    $scope.identity = identity;
    $scope.article = ArticleResource.getById({id: $routeParams.id});
});