'use strict';

var meanBlog = angular
    .module('meanBlog', ['ngResource', 'ngRoute', 'ngCookies'])
    .config(function ($routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'partials/main/home.html',
                controller: 'HomeController'
            })
            .when('/signup', {
                templateUrl: '/partials/account/signup',
                controller: 'SignUpController'
            })
            .when('/profile', {
                templateUrl: '/partials/account/profile',
                controller: 'ProfileController'
            })
            .otherwise({redirectTo: '/'});
    })
    .value('toastr', toastr)
    .constant('appName', 'Mean Blog');
