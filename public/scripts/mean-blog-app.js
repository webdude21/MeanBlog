'use strict';

var meanBlog = angular
    .module('meanBlog', ['ngResource', 'ngRoute'])
    .config(function ($routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'partials/home.html',
                controller: 'HomeController'
            })
            .otherwise({redirectTo: '/'});
    })
    .value('toastr', toastr)
    .constant('appName', 'Mean Blog');
