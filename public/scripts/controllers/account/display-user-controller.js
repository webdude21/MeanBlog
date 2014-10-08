meanBlog.controller('DisplayUserController', function ($scope, identity, $routeParams, $location, notifier, $http) {
    var username = $routeParams.username;
    $http.get("/api/getuser/" + username)
        .success(function (displayUserData) {
            $scope.user = displayUserData;
        }).error(function (serverResponse, status, headers, config) {
            notifier.error(serverResponse);
        }
    );
    $scope.user = { username: 'test'}; // EditUserResource.get({ username: username});
});
