'use strict';
meanBlog.controller('CategoryEditController', function CategoryEditController($scope, $http, $routeParams, notifier) {
    var ERROR_READING_CATEGORY = 'Cannot read categories!',
        CATEGORY_API_PATH = '/api/categories/';

    if ($routeParams.id && $routeParams.id !== 'null') {
        $http.get(CATEGORY_API_PATH + $routeParams.id).success(function (result) {
            $scope.category = result[0];
            $scope.date = dateToInputString(result[0].date);
            $scope.edit = true;
        }).error(function () {
            notifier.error(ERROR_READING_CATEGORY);
        });
    } else {
        $scope.edit = false;
    }
});

function pad(number) {
    if (number < 10) {
        return '0' + number;
    }
    return number;
}

function dateToInputString(dateFromDB) {
    var date = new Date(dateFromDB);

    return   date.getUTCFullYear() +
        '-' + pad(date.getUTCMonth() + 1) +
        '-' + pad(date.getUTCDate());
}