'use strict';
meanBlog.controller('ArticlesController', function ArticlesController($scope, $routeParams, CategoryResource, identity, ArticleResource) {
    var categoryParams = $routeParams.category || '';

    $scope.identity = identity;
    $scope.request = {
        orderBy: 'title',
        orderType: 'false',
        page: 1,
        category: categoryParams
    };
    $scope.categories = CategoryResource.getAllCategories();

    $scope.query = function(queryObject){
        if (queryObject.page <= 0){
            queryObject.page = 1;
            return;
        }

        ArticleResource.query(queryObject)
            .$promise
            .then(function(articles){
                $scope.articles = articles
            });
    };
    $scope.articles = ArticleResource.query($scope.request);
});