'use strict';
meanBlog.directive('articleView', function () {
    return {
        restrict: 'EA',
        templateUrl: 'partials/article/directives/article-view.html',
        replace: true,
        scope: true,
        controller: function ($scope, $route, ArticleResource, notifier) {
            var DELETE_SUCCESS = "The article was successfully deleted!";
            $scope.deleteArticle = function (articleId) {
                ArticleResource.deleteById({id: articleId}, function (response) {
                    if (response.$resolved) {
                        notifier.success(DELETE_SUCCESS);
                        $route.reload();
                    } else {
                        notifier.error("The article wasn't deleted!")
                    }
                });
            };
        }
    }
});