meanBlog.factory('identity', function (appName, $cookieStore) {
    var cookieStorageUserKey = appName;

    var currentUser;
    return {
        getCurrentUser: function () {
            var savedUser = $cookieStore.get(cookieStorageUserKey);
            if (savedUser) {
                return savedUser;
            }

            return currentUser;
        },
        setCurrentUser: function (user) {
            if (user) {
                $cookieStore.put(cookieStorageUserKey, user);
            }
            else {
                $cookieStore.remove(cookieStorageUserKey);
            }

            currentUser = user;
        },
        isAuthorizedForRole: function (role) {
            return !!currentUser && currentUser.roles.indexOf(role) > -1;
        }
    }
});