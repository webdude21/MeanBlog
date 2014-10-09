'use strict';
meanBlog.controller('CategoryEditController', function CategoryEditController($scope, $http, $routeParams, $location, notifier) {
    var ERROR_READING_CATEGORY = 'Cannot read categories!',
        ERROR_UPDATING_CATEGORY = 'Cannot update category!',
        ERROR_CREATING_CATEGORY = 'Cannot create category!',
        SUCCESS_UPDATING_CATEGORY = 'Category updated successfully!',
        SUCCESS_CREATED_CATEGORY = 'Category created successfully!',
        CATEGORY_API_PATH = '/api/categories/';

    $scope.saveCategory = function saveCategory() {
        var category = {
            title: $scope.category.title
        };

        if ($scope.edit) {
            category.id = $scope.category._id;
            category.date = new Date($scope.date);
            $http.put(CATEGORY_API_PATH + $scope.category._id, category).success(function () {
                notifier.success(SUCCESS_UPDATING_CATEGORY);
                $location.path('/categories/all');
            }).error(function () {
                notifier.error(ERROR_UPDATING_CATEGORY);
            });
        } else {
            $http.post(CATEGORY_API_PATH, category).success(function () {
                notifier.success(SUCCESS_CREATED_CATEGORY);
                $location.path('/');
            }).error(function () {
                notifier.error(ERROR_CREATING_CATEGORY);
            });
        }
    };

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

    return date.getUTCFullYear() + '-' + pad(date.getUTCMonth() + 1) + '-' + pad(date.getUTCDate());
}