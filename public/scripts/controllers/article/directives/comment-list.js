'use strict';
meanBlog.directive('comments', function () {
    return {
        restrict: 'EA',
        templateUrl: 'partials/article/directives/comment-list.html',
        replace: true
    }
});