'use strict';
meanBlog.controller('ArticleDeleteWarningController',
    function ArticleDeleteWarningController($scope, $route, notifier, ArticleResource) {
        var DELETE_SUCCESS = "The article was successfully deleted!";

        $scope.deleteForReal = function () {
            ArticleResource.deleteById({id: $scope.articleId}, function (response) {
                $scope.closeThisDialog(0);
                if (response.$resolved) {
                    notifier.success(DELETE_SUCCESS);
                    $route.reload();
                } else {
                    notifier.error("The article wasn't deleted!")
                }
            });
        };
    });