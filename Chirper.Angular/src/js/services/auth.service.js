(function() {
    'use strict';

    angular
        .module('app')
        .factory('authService', authService);

    authService.$inject = ['$http', '$q', 'localStorageService', '$location', 'apiUrl'];

    /* @ngInject */
    function authService($http, $q, localStorageService, $location, apiUrl) {
        var state = {
        	isLoggedIn: false
        };
     
        var service = {
            state: state,
            register: register,
            login: login,
            logout: logout,
            init: init
         
        };
        return service;

        ////////////////

        function register(registration) {
        	var defer = $q.defer();

        	$http.post(apiUrl + 'accounts/register', registration)
        		 .then(
        		 	function(response){
        		 		defer.resolve(response);
        		 	},
        		 	function(err) {
        		 		defer.reject(err.data.modelState[Object.keys(err.data.modelState)[0]][0]);
        		 	}
        		 );
        	return defer.promise;
        }

        function login(username, password) {
        	logout();

        	var defer = $q.defer();

        	var data = 'grant_type=password&username=' + username + '&password=' + password;

        	$http.post(apiUrl + 'token', data, { headers: {'Content-Type': 'application/x-www-form-urlencoded' }})
        		 .then(
        		 	function(response) {
        		 		localStorageService.set('authorizationData', response.data);
        		 		
        		 		state.isLoggedIn = true;
                        
        		 		defer.resolve(response.data);
        		 	},
        		 	function(err) {
        		 		defer.reject(err);
                        console.log(err);
        		 	}
        		 );
        	return defer.promise;

        }

        function getCurrentUser (){
            return currentUser;
        }
        function getState(){
            return state.isLoggedIn;
        }

        function logout() {
        	localStorageService.remove('authorizationData');

        	state.isLoggedIn = false;

        	$location.path('#/login');
        }

        function init() {
        	var authData = localStorageService.get('authorizationData');
        	
        	if(authData) {
        		state.isLoggedIn = true;

        		$location.path('#/posts');
        	}
        }

    }
})();