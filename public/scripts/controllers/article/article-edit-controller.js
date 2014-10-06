'use strict';
meanBlog.controller('ArticleEditController',
    function ArticleEditController($scope, identity, $routeParams, CategoryResource, ArticleResource) {
        $scope.identity = identity;
        $scope.categories = CategoryResource.getAllCategories();
        $scope.article = ArticleResource.getById({id: $routeParams.id});

        $scope.update = function (){

        }
    });