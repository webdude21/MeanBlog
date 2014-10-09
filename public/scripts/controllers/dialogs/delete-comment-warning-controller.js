'use strict';
meanBlog.controller('CommentDeleteWarningController',
    function CommentDeleteWarningController($scope, $route, notifier, CommentResource) {
        var DELETE_SUCCESS = "The comment was successfully deleted!";

        $scope.deleteForReal = function () {
            CommentResource.deleteById({id: $scope.commentToDeleteId}, function (response) {
                $scope.closeThisDialog(0);
                if (response.$resolved) {
                    notifier.success(DELETE_SUCCESS);
                    $route.reload();
                } else {
                    notifier.error("The comment wasn't deleted!")
                }
            });
        };
    });