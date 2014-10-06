'use strict';
meanBlog.controller('ArticleCreateController', function ArticleCreateController($scope, ArticleResource, CategoryResource) {
    $scope.categories = CategoryResource.getAllCategories();
    $scope.article = {};

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

    $scope.createNew = function (article) {
        article.meta = {
            tags: extractTags(article)
        };
        ArticleResource.save(article);
        $scope.getArticleById = {};
    };
});