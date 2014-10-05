'use strict';
meanBlog.controller('ArticlesController', function ArticlesController($scope, ArticleResource) {
    $scope.articles = ArticleResource.getAllArticles();
});