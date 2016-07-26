(function() {
    'use strict';

    angular
        .module('app')
        .factory('PostFactory', PostFactory);

    PostFactory.$inject = ['$http', '$q', 'apiUrl'];

    /* @ngInject */
    function PostFactory($http, $q, apiUrl) {

        var service = {
            getPosts: getPosts,
            addPost: addPost,
            updatePost: updatePost,
            addComment: addComment,
            getTwitter: getTwitter
        };
        return service;

        ////////////////

        function getPosts() {
            var defer = $q.defer();
            $http({
                method: 'GET',
                url: apiUrl + "posts"
            }).then(function(response) {
                defer.resolve(response);
            }, function(error) {
                defer.reject(error);
            });
            return defer.promise;
        }

        function addPost(post) {
            var defer = $q.defer();
            $http({
                method: "POST",
                url: apiUrl + "posts",
                data: post
            }).then(function(response) {
                defer.resolve(response);
            }, function(error) {
                defer.reject(error);
            });
            return defer.promise;
        }

        function updatePost(post) {
            var defer = $q.defer();
            $http({
                method: 'PUT',
                url: apiUrl + "posts/" + post.postId,
                data: post
            }).then(function(response) {
                defer.resolve(response);
            }, function(error) {
                defer.reject(error);
            });
            return defer.promise;
        }

        function addComment(comment) {
            var defer = $q.defer();
            $http({
                method: "POST",
                url: apiUrl + "comments",
                data: comment
            }).then(function(response) {
                defer.resolve(response);
            }, function(error) {
                defer.reject(error);
            });
            return defer.promise;
        }

        function getTwitter() {
            var defer = $q.defer();
               $http({
                method: "GET",
                url: "https://api.twitter.com/1.1/statuses/home_timeline.json",
                params: {
                    "consumer key": "fQMabVYGDqSQR5i6oWQ5MeaE8"
                }
            }).then(function(response) {
                defer.resolve(response);
            }, function(error) {
                defer.reject(error);
            });
            return defer.promise;
        }


    }
})();
