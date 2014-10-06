'use strict';
meanBlog.factory('ArticleResource', function ArticleResource($resource) {
    return $resource('/api/articles/:id', null, {
        getById: {
            method: 'GET',
            params: {id: '@id'}
        },
        update:{
            method: 'PUT',
            params: {id: '@id'}
        }
    });
});
