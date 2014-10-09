'use strict';

var meanBlog = angular
    .module('meanBlog', ['ngResource', 'ngRoute', 'ngCookies', 'textAngular', 'ngAnimate', 'ngDialog'])
    .config(function ($routeProvider, $httpProvider) {
        $httpProvider.interceptors.push('errorHandlerHttpInterceptor');


        var AUTHORIZED_PUBLISHER_ROLES = ['admin', 'editor', 'author'];
        var routeUserChecks = {
            publisherRoles: {
                authenticate: function (auth) {
                    return auth.isAuthorizedForAnyOfTheFollowingRoles(AUTHORIZED_PUBLISHER_ROLES);
                }
            },
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
            .when('/articles/create', {
                templateUrl: '/partials/article/create',
                controller: 'ArticleCreateController',
                resolve: routeUserChecks.publisherRoles
            })
            .when('/articles/edit/:id', {
                templateUrl: '/partials/article/edit',
                controller: 'ArticleEditController',
                resolve: routeUserChecks.publisherRoles
            })
            .when('/articles/:id', {
                templateUrl: '/partials/article/detail',
                controller: 'ArticleDetailController'
            })
            .when('/categories/all', {
                templateUrl: '/partials/category/categories',
                controller: 'CategoriesController'
            })
            .when('/categories/edit/:id', {
                templateUrl: '/partials/category/edit',
                controller: 'CategoryEditController',
                resolve: routeUserChecks.publisherRoles
            })
            .when('/comments/create/:articleId',{
                templateUrl: '/partials/comment/create',
                controller: 'CommentCreateController',
                resolve: routeUserChecks.authenticated
            })
            .when('/comments/edit/:commentId',{
            templateUrl: '/partials/comment/edit',
            controller: 'CommentEditController',
            resolve: routeUserChecks.authenticated
        })
            .when('/profile', {
                templateUrl: '/partials/account/profile',
                controller: 'ProfileController',
                resolve: routeUserChecks.authenticated
            })
            .when('/users/:username', {
                templateUrl: '/partials/account/display-user',
                controller: 'DisplayUserController'
            })
            .when('/admin/users', {
                templateUrl: '/partials/admin/users-list',
                controller: 'UserListController',
                resolve: routeUserChecks.adminRole
            })
            .when('/admin/users/edit/:username', {
                templateUrl: '/partials/admin/edit-user',
                controller: 'EditUserController',
                resolve: routeUserChecks.adminRole
            })
            .when('/admin/comments', {
                templateUrl: '/partials/admin/comments-list',
                controller: 'AdminListCommentsController',
                resolve: routeUserChecks.adminRole
            })
            .when('/profile/comments/all', {
                templateUrl: '/partials/comment/list-user-comments',
                controller: 'ListCommentsController',
                resolve: routeUserChecks.authenticated
            })
            .when('/unauthorized', {
                templateUrl: '/partials/main/unauthorized'
            })
            .when('/not-found', {
                templateUrl: '/partials/main/not-found'
            })
            .otherwise({redirectTo: '/'});
    })
    .value('toastr', toastr)
    .constant('appName', 'Mean Blog')
    .constant('serverPath', 'http://localhost:1234');

meanBlog.run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (ev, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/unauthorized');
        }
    })
});