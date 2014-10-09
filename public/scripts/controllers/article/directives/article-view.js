'use strict';
meanBlog.directive('articleView', function () {
    return {
        restrict: 'EA',
        templateUrl: 'partials/article/directives/article-view.html',
        replace: true,
        scope: true,
        controller: function ($scope, ArticleResource, notifier) {
            var UPDATE_SUCCESS = "The article was successfully updated!";
            $scope.deleteArticle = function (articleId) {
                ArticleResource.deleteById({id: articleId});
            };

            $scope.toggleHidden = function (article) {
                article.hidden = !article.hidden;
                ArticleResource.update(article, function(response){
                    if (response.$resolved){
                        notifier.success(UPDATE_SUCCESS);
                    }else{
                        notifier.error("The article wasn't updated!")
                    }
                })
            };
        }
    }
});