'use strict';
meanBlog.controller('ArticleEditController',
    function ArticleEditController($scope, identity, notifier, $routeParams, CategoryResource, ArticleResource) {
        $scope.identity = identity;
        $scope.categories = CategoryResource.getAllCategories();
        $scope.article = ArticleResource.getById({id: $routeParams.id}, function(){
            $scope.article.tags = $scope.article.meta.tags.join(' ');
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
            ArticleResource.update(article);
        }
    });