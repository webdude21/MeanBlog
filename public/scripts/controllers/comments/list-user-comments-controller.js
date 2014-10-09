'use strict';
meanBlog.controller('ListCommentsController',
    function ListCommentsController($scope, notifier, ngDialog, identity, $location, CommentResource) {
        $scope.identity = identity;
        $scope.commentsPage = 1;
        $scope.previousButtonEnabled = true;
        $scope.nextButtonEnabled = true;
        $scope.comemntsOnThisPage = 10;

        var updateCurrentPageSize = function () {
            $scope.comemntsOnThisPage = $scope.comments.length;
        };

        var getQueryObject = function (page, descending, orderBy) {
            return {
                orderBy: orderBy || 'date',
                orderType: orderBy || 'true',
                page: page,
                author: identity.currentUser._id
            }
        };

        $scope.deleteComment = function (commentId) {
            $scope.commentToDeleteId = commentId;
            ngDialog.open({
                scope: $scope,
                template: 'partials/dialogs/delete-comment-warning',
                controller: 'CommentDeleteWarningController'
            });
        };

        $scope.comments = CommentResource.query(getQueryObject($scope.commentsPage));

        $scope.prev = function () {
            $scope.commentsPage += 1;
            $scope.comments = CommentResource.query(getQueryObject($scope.commentsPage)
                , updateCurrentPageSize);
        };

        $scope.next = function () {
            $scope.commentsPage -= 1;
            $scope.comments = CommentResource.query(getQueryObject($scope.commentsPage)
                , updateCurrentPageSize);
        };


});