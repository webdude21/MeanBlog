meanBlog.controller('UserListController', function($scope, $http, notifier) {
    function getUsersList(gridRequest) {
        $http.post("/api/userslist" /* URL */, gridRequest)
            .success(function (gridResponse) {
                // Updating the $scope postresponse variable to update theview
                $scope.users = gridResponse.data;
                $scope.pager = gridResponse.pager;
                $scope.sort = gridResponse.sort;

                $scope.columns.forEach(function (column) {
                    if (column.name == $scope.sort.columnName) {
                        column.class = $scope.sort.order;
                    }
                    else{
                        column.class = undefined;
                    }
                    ;
                });
            }).error(function (serverResponse, status, headers, config) {
                notifier.error(serverResponse);
            }
        );
    }
    // get initial data
    getUsersList({});

    $scope.columns = [
        { name: "firstName", label: 'First name'},
        { name: "lastName", label: 'Last name'},
        { name: "username", label: 'Username'}
    ];
    $scope.headerClick = function(column){
        switch(column.class){
            case 'desc':
                column.class = 'asc';
                break;
            default :
                // desc is the default sort order
                column.class = 'desc';
                break;
        }
        var gridRequest = {
            pager: {
                currentPage: 1
            },
            sort:{
                columnName: column.name,
                order: column.class
            }
        };
        getUsersList(gridRequest);
    };
    $scope.getHeaderCssClass = function (sortOrder){
        var cssClass = '';
        switch(sortOrder){
            case 'desc':
                cssClass = 'glyphicon glyphicon-arrow-down';
                break;
            case 'asc':
                cssClass = 'glyphicon glyphicon-arrow-up';
                break;
        }

        return cssClass;
    };
});

