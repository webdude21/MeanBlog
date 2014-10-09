'use strict';
meanBlog.controller('CommentEditController',
    function CommentEditController($scope, notifier, identity, $location, CommentResource, $routeParams) {
        $scope.identity = identity;
        $scope.comment = CommentResource.getById({id: $routeParams.commentId}, function (response) {
            if (!response.$resolved) {
                notifier.error(response.data.reason)
            }
            if (identity.currentUser._id != $scope.comment.author.id){
                notifier.error("This is not your comment, so you cannot edit it!");
                $location.path("/articles/" + $scope.comment.article.id);
            }
        });

        var COMMENT_CREATE_EDIT = 'You comment was changed successfully!';

        $scope.editComment = function (comment) {
            CommentResource.update(comment, function (response) {
                if (response.$resolved) {
                    notifier.success(COMMENT_CREATE_EDIT);
                    $location.path("/articles/" + $scope.comment.article.id);
                } else {
                    notifier.error("Your comment cannot be changed!")
                }
            });
        }
    });