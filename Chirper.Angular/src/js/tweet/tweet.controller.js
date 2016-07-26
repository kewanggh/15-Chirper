//inject the twitterService into the controller
(function() {
    'use strict';

    angular
        .module('app')
        .controller('TwitterController', TwitterController);

    TwitterController.$inject = ['$scope', '$q', '$sce', 'twitterService'];

    /* @ngInject */
    function TwitterController($scope, $q, $sce, twitterService) {
       $scope.tweets=[];


        ////////////////
          //array of tweets
    
    twitterService.initialize();
    $scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        };

   $scope.getusername = function(email) {
            if ((email.indexOf('https')) > -1){
                return email.substr(0, email.indexOf('https'));
            } else{
                return email;
        }
        };

        $scope.gethttp = function(email) {
            return email.substring(email.indexOf("https"),email.lastIndexOf("https"));
        };
   /* $scope.getUrl = function(tweet){
        var url = tweet.entities.urls;
        if(url.length === 0){
            return  "https://www.google.com";
        } else {
         
            return $scope.trustSrc(tweet.entities.urls[0].url);
        }
    };*/
 $scope.searchTwts = function(text) {
        twitterService.searchTweets(text).then(function(data) {
            $scope.tweets = data.statuses;
            console.log($scope.tweets);
            $scope.tweetsearch = "";
        });
    };


    //using the OAuth authorization result get the latest 20 tweets from twitter for the user
    $scope.refreshTimeline = function() {
        twitterService.getLatestTweets().then(function(data) {
            $scope.tweets = data;
        });
    };

    //when the user clicks the connect twitter button, the popup authorization window opens
    $scope.connectButton = function() {
        twitterService.connectTwitter().then(function() {
            if (twitterService.isReady()) {
                //if the authorization is successful, hide the connect button and display the tweets
                $('#connectButton').fadeOut(function(){
                    $('#getTimelineButton, #signOut, #gobutton, #progressBar').fadeIn();
                    $scope.refreshTimeline();
                });
            }
        });
    };

    //sign out clears the OAuth cache, the user will have to reauthenticate when returning
    $scope.signOut = function() {
        twitterService.clearCache();
        $scope.tweets.length = 0;
        $('#getTimelineButton, #signOut, #gobutton, #progressBar').fadeOut(function(){
            $('#connectButton').fadeIn();
        });
    };

    //if the user is a returning user, hide the sign in button and display the tweets
    if (twitterService.isReady()) {
        $('#connectButton').hide();
        $('#getTimelineButton, #signOut, #gobutton, #progressBar').show();
        $scope.refreshTimeline();
    }
       
    }
})();

/*app.controller('TwitterController', function($scope, $q, twitterService) {

    $scope.tweets; //array of tweets
    
    twitterService.initialize();

    //using the OAuth authorization result get the latest 20 tweets from twitter for the user
    $scope.refreshTimeline = function() {
        twitterService.getLatestTweets().then(function(data) {
            $scope.tweets = data;
        });
    };

    //when the user clicks the connect twitter button, the popup authorization window opens
    $scope.connectButton = function() {
        twitterService.connectTwitter().then(function() {
            if (twitterService.isReady()) {
                //if the authorization is successful, hide the connect button and display the tweets
                $('#connectButton').fadeOut(function(){
                    $('#getTimelineButton, #signOut').fadeIn();
                    $scope.refreshTimeline();
                });
            }
        });
    };

    //sign out clears the OAuth cache, the user will have to reauthenticate when returning
    $scope.signOut = function() {
        twitterService.clearCache();
        $scope.tweets.length = 0;
        $('#getTimelineButton, #signOut').fadeOut(function(){
            $('#connectButton').fadeIn();
        });
    };

    //if the user is a returning user, hide the sign in button and display the tweets
    if (twitterService.isReady()) {
        $('#connectButton').hide();
        $('#getTimelineButton, #signOut').show();
        $scope.refreshTimeline();
    }

});*/