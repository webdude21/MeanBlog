'use strict';
meanBlog.controller('HomeController', function HomeController($scope, ArticleResource, identity) {
    $scope.identity = identity;
    $scope.articles = ArticleResource.query();
});