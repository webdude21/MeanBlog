meanBlog.controller('LoginController', function ($scope, $location, notifier, identity, auth) {
    $scope.identity = identity;

    $scope.login = function (user) {
        auth.login(user)
            .then(function (response) {
                if (response) {
                    notifier.success('Successful login!');
                }
                else {
                    notifier.error('Username/Password combination is not valid!');
                }
            }, function (error) {
                notifier.error(error.reason);
            });
    };

    $scope.logout = function () {
        auth.logout().then(function () {
            notifier.success('Successful logout!');
            if ($scope.user) {
                $scope.user.username = '';
                $scope.user.password = '';
            }
            $location.path('/');
        })
    }
});