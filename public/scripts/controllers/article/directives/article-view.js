'use strict';
meanBlog.directive('articleView', function () {
    return {
        restrict: 'EA',
        templateUrl: 'partials/article/directives/article-view.html',
        replace: true
    }
});