'use strict';
meanBlog.controller('ListCommentsController',
    function ListCommentsController($scope, notifier, identity, $location, CommentResource) {
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

        $scope.comments = CommentResource.query(getQueryObject($scope.commentsPage));

        $scope.older = function () {
            $scope.commentsPage += 1;
            $scope.comments = CommentResource.query(getQueryObject($scope.commentsPage)
                , updateCurrentPageSize);
        };

        $scope.newer = function () {
            $scope.commentsPage -= 1;
            $scope.comments = CommentResource.query(getQueryObject($scope.commentsPage)
                , updateCurrentPageSize);
        };


    });