'use strict';
meanBlog.controller('CommentCreateController',
    function CommentCreateController($scope, identity, CommentResource, $routeParams, ArticleResource) {
        $scope.identity = identity;
        $scope.article = ArticleResource.getById({id: $routeParams.articleId});

        $scope.create


    });