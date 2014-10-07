'use strict';
meanBlog.controller('ArticlesController', function ArticlesController($scope, CategoryResource, identity, ArticleResource) {
    $scope.identity = identity;
    $scope.request = {
        orderBy: 'title',
        orderType: 'false',
        page: 1,
        category: ""
    };
    $scope.categories = CategoryResource.getAllCategories();
    $scope.query = function(queryObject){
        if (queryObject.page <= 0){
            queryObject.page = 1;
            return;
        }
        $scope.articles = ArticleResource.query(queryObject);
    };
    $scope.articles = ArticleResource.query($scope.request);
});