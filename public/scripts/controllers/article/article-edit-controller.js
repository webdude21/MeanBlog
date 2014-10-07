'use strict';
meanBlog.controller('ArticleEditController',
    function ArticleEditController($scope, identity, notifier, $routeParams, CategoryResource, ArticleResource) {
        var UPDATE_SUCCESS = "The article was successfully updated!";
        $scope.identity = identity;
        $scope.categories = CategoryResource.getAllCategories();
        $scope.article = ArticleResource.getById({id: $routeParams.id}, function(){
            $scope.article.tags = $scope.article.meta.tags.join(' ');
            $scope.article.category = $scope.article.category.id;
        });

        function extractTags(article) {
            var saveTags = [];
            var allTags = article.title + ' ' + article.tags;
            allTags = allTags.split(/[ ,.!:/\\?-]+/);
            allTags.forEach(function (tag) {
                if (saveTags.indexOf(tag) < 0) {
                    saveTags.push(tag);
                }
            });

            return saveTags;
        }

        $scope.update = function (article) {
            article.meta = {
                tags: extractTags(article)
            };
            ArticleResource.update(article, function(response){
                if (response.$resolved){
                    notifier.success(UPDATE_SUCCESS);
                }else{
                    notifier.error("The article wasn't updated!")
                }
            });
        }
    });