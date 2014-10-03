meanBlog.controller('SignUpController', function($scope, $location, auth, notifier) {
    $scope.signup = function(user) {
        auth.signup(user).then(function() {
            notifier.success('Registration successful!');
            $location.path('/');
        }, function (error) {
            notifier.error(error.data.reason);
        })
    }
});