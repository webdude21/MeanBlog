'use strict';
meanBlog.controller('ArticleCreateController', function ArticleCreateController($scope, ArticleResource, CategoryResource) {
    $scope.categories = CategoryResource.getAllCategories();
    $scope.createNew = function(article){

    };

    function isEmpty(str) {
        return (!str || 0 === str.length || str.trim());
    }

    $scope.formIsInvalid = function(article){
        if (isEmpty(article.title)){
            return true;
        }

        if (isEmpty(article.body)){
            return true;
        }
    }

});