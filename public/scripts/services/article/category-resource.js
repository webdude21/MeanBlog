'use strict';
meanBlog.factory('CategoryResource', function CategoryResource($resource) {
    return $resource('/api/categories/:id', null, {
        update: {
            method: 'PUT',
            params: {_id: '@id'},
            isArray: false
        },
        getAllCategories: {
            method: 'GET',
            isArray: true
        }
    });
});