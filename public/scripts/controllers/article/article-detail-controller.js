'use strict';
meanBlog.controller('ArticleDetailController',
    function ArticleDetailController($scope, identity, CommentResource, $routeParams, ArticleResource) {
        $scope.identity = identity;
        $scope.commentsPage = 1;
        $scope.article = ArticleResource.getById({id: $routeParams.id});
        $scope.previousButtonEnabled = true;
        $scope.nextButtonEnabled = true;

        var queryObject = {
            orderBy: 'date',
            orderType: 'true',
            page: $scope.commentsPage,
            article: $routeParams.id
        };
        $scope.comments = CommentResource.query(queryObject);

        $scope.older = function () {
            $scope.commentsPage += 1;
            $scope.comments = CommentResource.query({
                orderBy: 'date',
                orderType: 'true',
                page: $scope.commentsPage,
                article: $routeParams.id
            });
        };

        $scope.newer = function () {
            $scope.commentsPage -= 1;
            $scope.comments = CommentResource.query({
                orderBy: 'date',
                orderType: 'true',
                page: $scope.commentsPage,
                article: $routeParams.id
            });
        }
    });