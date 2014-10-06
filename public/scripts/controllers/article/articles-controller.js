'use strict';
meanBlog.controller('ArticlesController', function ArticlesController($scope, identity, ArticleResource) {
    $scope.identity = identity;
    $scope.articles = ArticleResource.getAllArticles();
});