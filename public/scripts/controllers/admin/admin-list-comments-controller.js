'use strict';
meanBlog.controller('AdminListCommentsController', function ($scope, $http, notifier, identity) {
    function getUsersList(gridRequest) {
        $http.post("/api/gridComments" /* URL */, gridRequest)
            .success(function (gridResponse) {
                // Updating the $scope postresponse variable to update theview
                $scope.data = gridResponse.data;
                $scope.pager = gridResponse.pager;
                $scope.sort = gridResponse.sort;
                var pages = [];
                for (var i = 1; i <= $scope.pager.totalPages; i++) {
                    var page = { number: i};
                    if (i == $scope.pager.currentPage) {
                        page.class = 'active';
                    }

                    pages.push(page);
                }

                $scope.pages = pages;
                $scope.columns = gridResponse.columns;
                $scope.columns.forEach(function (column) {
                    if (column.name == $scope.sort.columnName) {
                        column.class = $scope.sort.order;
                    }
                    else {
                        column.class = undefined;
                    }

                });
            }).error(function (serverResponse, status, headers, config) {
                notifier.error(serverResponse);
            }
        );
    }

    $scope.currentUser = identity.currentUser;

    // get initial data
    refreshData();

    // actions
    $scope.headerClick = function (column) {
        if(!column.sortable){
            return;
        }
        var newClass = '';
        switch (column.class) {
            case 'desc':
                newClass = 'asc';
                break;
            default :
                // desc is the default sort order
                newClass = 'desc';
                break;
        }

        $scope.columns.forEach(function (column) {
            column.class = undefined;
        });

        $scope.sort.order = newClass;
        $scope.sort.columnName = column.name;
        column.class = newClass;
        refreshData();
    };
    $scope.getHeaderCssClass = function (sortOrder) {
        var cssClass = '';
        switch (sortOrder) {
            case 'desc':
                cssClass = 'glyphicon glyphicon-arrow-down';
                break;
            case 'asc':
                cssClass = 'glyphicon glyphicon-arrow-up';
                break;
        }

        return cssClass;
    };
    $scope.pagerClick = function (page) {
        $scope.pages.forEach(function (page) {
            page.class = undefined;
        });

        page.class = 'active';
        $scope.pager.currentPage = page.number;
        refreshData();
    };

    $scope.refreshData = function () {
        refreshData();
    };

    $scope.getProperty = function (obj, prop) {
        var parts = prop.split('.');
        var last = parts.pop();
        if(parts.length == 0){
            return obj[last];
        };
        var l = parts.length;
        var i = 1;
        var current = parts[0];


        while((obj = obj[current]) && i < l) {
            current = parts[i];
            i++;
        }

        if(obj) {
            return obj[last];
        }
    }

    function refreshData() {
        var gridRequest = {
            pager: {
                currentPage: 1
            },
            sort: {
                columnName: "date",
                "order": "asc"
            },
            columns: [
                { name: "article.title", label: 'Article', filterable: false, sortable: false },
                { name: "body", label: 'Text', filterable: true, sortable: true , method: "contains"},
                { name: "date", label: 'Date', filterable: false, sortable: true },
                { name: "author.username", label: 'Author', filterable: false, sortable: false }
            ]
        };
        if($scope.pager){
            gridRequest.pager.currentPage = $scope.pager.currentPage;
        }

        if($scope.sort){
            gridRequest.sort = $scope.sort;
        }

        if($scope.columns){
            gridRequest.columns = $scope.columns;
        }

        getUsersList(gridRequest);
    }
});