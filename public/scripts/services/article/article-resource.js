'use strict';
meanBlog.factory('ArticleResource', function ArticleResource($resource) {
    return $resource('/api/articles/:id', null, {
        update: {
            method: 'PUT',
            params: {_id: '@id'},
            isArray: false
        },
        getAllArticles: {
            method: 'GET',
            isArray: true
        }
    });
});