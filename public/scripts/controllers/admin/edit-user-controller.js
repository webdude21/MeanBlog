meanBlog.controller('EditUserController', function ($scope, identity, EditUserResource, $routeParams, $location, notifier) {
    var username = $routeParams.username;
    $scope.user = EditUserResource.get({ username: username});

    $scope.updateUserRoles = function (user) {
        user.roles = [];
        if (user.isAdmin) {
            user.roles.push("admin");
        }
        if (user.isEditor) {
            user.roles.push("editor");
        }
        if (user.isAuthor) {
            user.roles.push("publisher");
        }
        if (user.isUser) {
            user.roles.push("user");
        }
        var editUserResource = new EditUserResource(user);
        editUserResource.$put()
            .then(function () {
                $location.path('/admin/users');
                notifier.success('User roles updated!');
            }, function (response) {
                $location.path('/admin/users');
                notifier.success('User roles NOT updated!' + response);
            });
    }
});
