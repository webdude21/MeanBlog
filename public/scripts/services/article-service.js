'use strict';
meanBlog.factory('ArticleService', function($resource) {
    var UsersResource = $resource('/api/articles/:id', {_id:'@id'}, { update: {method: 'PUT', isArray: false}});

    UsersResource.prototype.isAdmin = function() {
        return this.roles && this.roles.indexOf('admin') > -1;
    };

    return UsersResource;
});