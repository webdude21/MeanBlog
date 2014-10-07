meanBlog.controller('UserListController', function($scope, $http, notifier) {
    function getUsersList(gridRequest) {
        $http.post("/api/userslist" /* URL */, gridRequest)
            .success(function (gridResponse) {
                // Updating the $scope postresponse variable to update theview
                $scope.users = gridResponse.data;
                $scope.pager = gridResponse.pager;
                $scope.sort = gridResponse.sort;
                var pages = [];
                for(var i = 1; i<=$scope.pager.totalPages; i++){
                    var page = { number: i};
                    if(i == $scope.pager.currentPage){
                        page.class = 'active';
                    }

                    pages.push(page);
                }

                $scope.pages = pages;
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

    // actions
    $scope.headerClick = function(column){
        var newClass = '';
        switch(column.class){
            case 'desc':
                newClass = 'asc';
                break;
            default :
                // desc is the default sort order
                newClass = 'desc';
                break;
        }

        $scope.columns.forEach(function(column){
            column.class = undefined;
        });

        column.class = newClass;
        refreshData();
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
    $scope.pagerClick = function(page){
        $scope.pages.forEach(function(page){
            page.class = undefined;
        });

        page.class = 'active';
        refreshData();
    }

    function refreshData(){
        var gridRequest = {
            pager:{
                currentPage:1
            },
            sort:{
                columnName: "username",
                "order":"asc"
            }
        }
        $scope.pages.forEach(function(page){
            if(page.class == 'active'){
                gridRequest.pager.currentPage = page.number;
                return false;
            }
        });

        $scope.columns.forEach(function(column){
            if(column.class != undefined){
                gridRequest.sort.columnName = column.name;
                gridRequest.sort.order = column.class;
            }
        });

        getUsersList(gridRequest);
    }
});

