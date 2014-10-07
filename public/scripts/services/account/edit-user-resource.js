meanBlog.factory('EditUserResource', function($resource) {
    var UsersResource = $resource('/admin/user-edit/:username', {username:'@username'},{
        get: {
            method: 'get'
        },
        put: {
            method: 'put'
        }
    });

    UsersResource.prototype.isAdmin = function() {
        return this.roles && this.roles.indexOf('admin') > -1;
    };

    return UsersResource;
});