'use strict';
meanBlog.directive('categories', function () {
    return {
        restrict: 'EA',
        templateUrl: 'partials/article/directives/category-list.html',
        replace: true
    }
});