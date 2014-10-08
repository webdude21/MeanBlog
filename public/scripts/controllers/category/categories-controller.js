'use strict';
meanBlog.controller('CategoriesController', function CategoriesController($scope, $http, identity, notifier) {
    var ERROR_READING_CATEGORY = 'Cannot read categories!';

    $scope.identity = identity;
    $scope.categories = $http.get('/api/categories/').success(function (result) {
        $scope.categories = result;
    }).error(function () {
        notifier.error(ERROR_READING_CATEGORY);
    });
});