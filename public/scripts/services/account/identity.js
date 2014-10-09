meanBlog.factory('identity', function ($window, UsersResource) {
    var user;
    if ($window.bootstrappedUserObject) {
        user = new UsersResource();
        angular.extend(user, $window.bootstrappedUserObject);
    }
    return {
        currentUser: user,
        isAuthenticated: function () {
            return !!this.currentUser;
        },
        isAuthorizedForRole: function (role) {
            return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
        },
        isCreator: function (userId) {
            return this.currentUser && this.currentUser._id === userId;
        },
        isAdminOrCreator: function (userId) {
            return this.currentUser && this.currentUser._id === userId || this.isAuthorizedForRole('admin');
        },
        isAuthorizedForAnyOfTheFollowingRoles: function (roles) {
            if (!(roles instanceof Array)) {
                throw new Error('The method expects ana array');
            }

            var that = this;
            var authorized = false;
            roles.forEach(function (role) {
                if (that.isAuthorizedForRole.call(that, role)) {
                    authorized = true;
                }
            });

            return authorized;
        }
    }
});