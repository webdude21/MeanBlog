meanBlog.controller('ArticlesController', function ($scope, ArticleResource) {
    $scope.articles = ArticleResource.getAllArticles();
});