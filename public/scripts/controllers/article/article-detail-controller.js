'use strict';
meanBlog.controller('ArticleDetailController',
    function ArticleDetailController($scope, identity, CommentResource, $routeParams, ArticleResource) {
    $scope.identity = identity;
    $scope.article = ArticleResource.getById({id: $routeParams.id});
    $scope.comments = CommentResource.query({
        orderBy: 'title',
        orderType: 'false',
        page: 1,
        article: $routeParams.id
    });
});