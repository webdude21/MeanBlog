'use strict';
meanBlog.directive('categories', function () {
    return {
        restrict: 'A',
        templateUrl: 'partials/article/directives/category-list.html',
    }
});