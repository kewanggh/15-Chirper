(function() {
    'use strict';

    angular
        .module('app')
        .controller('PostsController', PostsController);

    PostsController.$inject = ['PostFactory', 'authService', 'toastr', '$location', '$anchorScroll'];

    /* @ngInject */
    function PostsController(PostFactory, authService, toastr, $location, $anchorScroll) {
        var vm = this;
        vm.title = 'PostsController';
        vm.posts = [];

        vm.post = { Text: '' };
        /*vm.comment = {Text: ''};*/
        /*vm.post.comments = [];
         */


        /*  vm.gettingUser = function(){
                vm.user = authService.getCurrentUser();
                console.log(vm.user);
            };*/
        /*      vm.$watch(authService.getState, function ( getState ) {
          vm.getState = getState;
          vm.currentUser = authService.currentUser();

        })();*/

        ////////////////
        vm.gotoTop = function() {
            // set the location.hash to the id of
            // the element you wish to scroll to.
            $location.hash('top');
            $anchorScroll.yOffset = 10;
            // call $anchorScroll()
            $anchorScroll();
        };
        vm.isActive = true;
        vm.activeButton = function() {
            vm.isActive = !vm.isActive;
        };

        vm.charactersRemaining = function() {
            if (vm.post && vm.post.Text) {
                return 140 - vm.post.Text.length;
            }
            return 140;
        };

        vm.gettingPost = function() {
            PostFactory.getPosts().then(function(response) {
                vm.posts = response.data;
                console.log(vm.posts);
            }, function(error) {
                toastr.error('There has been an error');
            });
        };

        vm.addingPost = function(post) {
            PostFactory.addPost(post).then(function(response) {
                vm.posts.push(response.data);
                /* vm.post = {CreatedDate: '', Text: '', CreatedDate: ''};*/
                vm.post = {};
            }, function(error) {
                toastr.error('There has been an error');
            });
        };


        vm.updatingLikeCount = function(post) {
            post.likeCount += 1;
            console.log(post);
            PostFactory.updatePost(post).then(function(response) {}, function(error) {
                toastr.error('There has been an error');
            });
        };

        vm.addingComment = function(post, comment) {
            comment.postId = post.postId;
            /*  console.log(post);
              console.log(comment);*/
            PostFactory.addComment(comment).then(function(response) {
                if (post.comments === null) {
                    post.comments = [];
                    post.comments.push(response.data);
                } else {
                    post.comments.push(response.data);
                }
                /*console.log(post.comments);*/
                //vm.post = {CreatedDate: '', Text: '', CreatedDate: ''};
                vm.comment = {};
            }, function(error) {
                toastr.error('There has been an error');
            });
        };

        vm.logingout = function() {
            authService.logout();
        };

        vm.getusername = function(email) {
            return email.substr(0, email.indexOf('@'));
        };

        vm.getChirpCount = function(array) {
            return array.length;
        };

        vm.search = function(phrase) {
            var obj = vm.posts.filter(function(obj) {
                return obj.text === phrase;
            });

            console.log(obj);
            vm.texttosearch = phrase;
        };

        vm.searchPopular = function() {
            var obj = vm.posts.filter(function(obj) {
                return obj.likeCount > 30;
            });
            /*console.log(obj);*/
        };

        vm.myBlurFunction = function(state) {
            var containerElement = document.getElementById('testlayout');
            var overlayEle = document.getElementById('overlay');

            if (state) {
                overlayEle.style.display = 'block';
                containerElement.setAttribute('class', 'blur container');
            } else {
                overlayEle.style.display = 'none';
                containerElement.setAttribute('class', 'container');
            }
        };


    }
})();
