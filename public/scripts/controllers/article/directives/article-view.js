'use strict';
meanBlog.directive('articleView', function () {
    return {
        restrict: 'EA',
        templateUrl: 'partials/article/directives/article-view.html',
        replace: true,
        scope: true,
        controller: function ($scope, $route, ngDialog) {
            $scope.deleteArticle = function (articleId) {
                $scope.articleId = articleId;
                ngDialog.open({
                    scope: $scope,
                    template: 'partials/dialogs/delete-article-warning',
                    controller: 'ArticleDeleteWarningController'
                });
            };
        }
    }
});