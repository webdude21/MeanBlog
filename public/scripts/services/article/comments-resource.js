'use strict';
meanBlog.factory('CommentResource', function CommentResource($resource) {
    return $resource('/api/comments/:id', null, {
        getById: {
            method: 'GET',
            params: {id: '@id'}
        },
        update:{
            method: 'PUT',
            params: {id: '@id'}
        },
        deleteById:{
            method: 'DELETE',
            params: {id: '@id'}
        }
    })
});