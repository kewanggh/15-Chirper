(function() {
    'use strict';

    angular
        .module('app', [
            'ui.router',
            'LocalStorageModule',
            'toastr',
            'twitterApp.services',
            'ngSanitize'
        ])
        .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider){
        	$httpProvider.interceptors.push('authInterceptor');
            $urlRouterProvider.otherwise('login');
        	$stateProvider.state('register',{ url: '/register', templateUrl: '/templates/register.html', controller: 'RegisterController as registerCtrl' })
        				  .state('login',{ url: '/login', templateUrl: '/templates/login.html', controller: 'LoginController as loginCtrl' })
                          .state('posts', { url: '/posts', templateUrl: '/templates/posts.html', controller: 'PostsController as postsCtrl' });
            
        }])
        .value('apiUrl', 'http://localhost:52912/api/');
})();