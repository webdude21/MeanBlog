'use strict';
meanBlog.controller('CommentCreateController',
    function CommentCreateController($scope, notifier, identity, $location, CommentResource, $routeParams, ArticleResource) {
        $scope.identity = identity;
        $scope.article = ArticleResource.getById({id: $routeParams.articleId});
        var COMMENT_CREATE_SUCCESS = 'You comment was sent successfully!';

        $scope.createNew = function (comment) {
            comment.article = $routeParams.articleId;
            CommentResource.save(comment, function (response) {
                if (response.$resolved) {
                    notifier.success(COMMENT_CREATE_SUCCESS);
                    $location.path("/articles/" + response._id);
                } else {
                    notifier.error("Your comment cannot be created!")
                }
            });
        }
    });