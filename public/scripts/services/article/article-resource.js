'use strict';
meanBlog.factory('ArticleResource', function ArticleResource($resource) {
    return $resource('/api/articles/:id', null, {
        getById: {
            method: 'GET',
            params: {id: '@id'}
        },
        getAllArticles: {
            method: 'GET',
            isArray: true
        }
    });
});