meanBlog.factory('UsersResource', function($resource) {
    var AUTHORIZED_PUBLISHER_ROLES = ['admin', 'editor', 'author'];
    var UsersResource = $resource('/api/users/:id', {_id:'@id'}, { update: {method: 'PUT', isArray: false}});

    UsersResource.prototype.isAdmin = function() {
        return this.roles && this.roles.indexOf('admin') > -1;
    };

    UsersResource.prototype.isPublisher = function() {
        var authorized = false;
        var that = this;
        AUTHORIZED_PUBLISHER_ROLES.forEach(function (role) {
            if (that.roles && that.roles.indexOf(role) > -1) {
                authorized = true;
            }
        });

        return authorized;
    };

    return UsersResource;
});