'use strict';
meanBlog.controller('ArticlesController', function ArticlesController($scope, CategoryResource, identity, ArticleResource) {
    $scope.identity = identity;
    $scope.request = {
        orderBy: 'title',
        orderType: 'false',
        article: 'any'
    };
    $scope.categories = CategoryResource.getAllCategories();
    $scope.query = function(queryObject){
        $scope.articles = ArticleResource.query(queryObject);
    };
    $scope.articles = ArticleResource.query($scope.request);
});