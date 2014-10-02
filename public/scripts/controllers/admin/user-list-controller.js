meanBlog.controller('UserListController', function($scope, UsersResource) {
    $scope.users = UsersResource.query();
});