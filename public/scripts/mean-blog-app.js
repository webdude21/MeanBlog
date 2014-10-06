'use strict';

var meanBlog = angular
    .module('meanBlog', ['ngResource', 'ngRoute', 'ngCookies', 'textAngular'])
    .config(function ($routeProvider) {

        var routeUserChecks = {
            adminRole: {
                authenticate: function (auth) {
                    return auth.isAuthorizedForRole('admin');
                }
            },
            authenticated: {
                authenticate: function (auth) {
                    return auth.isAuthenticated();
                }
            }
        };

        $routeProvider
            .when('/', {
                templateUrl: '/partials/main/home',
                controller: 'HomeController'
            })
            .when('/signup', {
                templateUrl: '/partials/account/signup',
                controller: 'SignUpController'
            })
            .when('/articles/all', {
                templateUrl: '/partials/article/articles',
                controller: 'ArticlesController'
            })
            .when('/articles/:id', {
                templateUrl: '/partials/article/article-detail',
                controller: 'ArticleDetailController'
            })
            .when('/articles/create', {
                templateUrl: '/partials/article/create',
                controller: 'ArticleCreateController'
            })
            .when('/profile', {
                templateUrl: '/partials/account/profile',
                controller: 'ProfileController',
                resolve: routeUserChecks.authenticated
            })
            .when('/admin/users', {
                templateUrl: '/partials/admin/users-list',
                controller: 'UserListController',
                resolve: routeUserChecks.adminRole
            })
            .otherwise({redirectTo: '/'});
    })
    .value('toastr', toastr)
    .constant('appName', 'Mean Blog')
    .constant('serverPath', 'http://localhost:1234');

meanBlog.run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (ev, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    })
});