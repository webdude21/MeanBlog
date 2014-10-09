'use strict';
meanBlog.controller('ArticleDetailController',
    function ArticleDetailController($scope, identity, ngDialog, CommentResource, $routeParams, ArticleResource) {
        $scope.identity = identity;
        $scope.commentsPage = 1;
        $scope.article = ArticleResource.getById({id: $routeParams.id}, function(response){
            if (response.$reject){
                $location.path("/not-found");
            }
        });

        $scope.previousButtonEnabled = true;
        $scope.nextButtonEnabled = true;
        $scope.comemntsOnThisPage = 10;

        $scope.deleteComment = function (commentId) {
            $scope.commentToDeleteId = commentId;
            ngDialog.open({
                scope: $scope,
                template: 'partials/dialogs/delete-comment-warning',
                controller: 'CommentDeleteWarningController'
            });
        };

        var updateCurrentPageSize = function () {
            $scope.comemntsOnThisPage = $scope.comments.length;
        };

        var getQueryObject = function (page) {
            return {
                orderBy: 'date',
                orderType: 'true',
                page: page,
                article: $routeParams.id
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
        }
    });