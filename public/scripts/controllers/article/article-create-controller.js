'use strict';
meanBlog.controller('ArticleCreateController',
    function ArticleCreateController($scope, notifier, ArticleResource, CategoryResource, $location) {
    $scope.categories = CategoryResource.getAllCategories();
    $scope.article = {};
    var ARTICLE_CREATE_SUCCESS = 'Article created successfully!';

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
        ArticleResource.save(article, function(response){
            if (response.$resolved){
                notifier.success(ARTICLE_CREATE_SUCCESS);
                $scope.article = {};
                $location.path("/articles/" + response._id);
            }else{
                notifier.error("The article cannot be created!")
            }
        });

    };
});