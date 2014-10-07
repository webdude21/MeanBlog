'use strict';
meanBlog.controller('CategoryDetailController',
    function CategoryDetailController($scope, identity, $routeParams, CategoryResource) {
    $scope.identity = identity;
    $scope.article = CategoryResource.getById({id: $routeParams.id});
});