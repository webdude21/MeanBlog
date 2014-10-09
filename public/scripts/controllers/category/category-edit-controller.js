'use strict';
meanBlog.controller('CategoryEditController', function CategoryEditController($scope, $http, $routeParams, notifier) {
    var ERROR_READING_CATEGORY = 'Cannot read categories!',
        CATEGORY_API_PATH = '/api/categories/';

    if ($routeParams.id && $routeParams.id !== 'null') {
        $http.get(CATEGORY_API_PATH + $routeParams.id).success(function (result) {
            $scope.category = result[0];
            $scope.edit = true;
        }).error(function () {
            notifier.error(ERROR_READING_CATEGORY);
        });
    } else {
        $scope.edit = false;
    }
});