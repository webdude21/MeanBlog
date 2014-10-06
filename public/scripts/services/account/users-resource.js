meanBlog.factory('UsersResource', function($resource) {
    var AUTHORIZED_PUBLISHER_ROLES = ['admin', 'editor', 'contributor'];
    var UsersResource = $resource('/api/users/:id', {_id:'@id'}, { update: {method: 'PUT', isArray: false}});

    UsersResource.prototype.isAdmin = function() {
        return this.roles && this.roles.indexOf('admin') > -1;
    };

    UsersResource.prototype.isPublisher = function() {
        var authorized = false;
        AUTHORIZED_PUBLISHER_ROLES.forEach(function (role) {
            if (this.roles && this.roles.indexOf(role) > -1) {
                authorized = true;
            }
        });

        return authorized;
    };

    return UsersResource;
});