'use strict';
meanBlog.controller('CategoriesController', function CategoriesController($scope, $http, notifier) {
    $scope.categories = $http.get('/api/categories/').success(function (result) {
        $scope.categories = result;
    }).error(function (error) {
        notifier.error(error);
    });
});