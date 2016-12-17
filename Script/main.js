//<![CDATA[
var TempFeeds;
var tempCount = 0;
'use strict';

var App = angular.module('RSSFeedApp', []);

App.controller("FeedCtrl", ['$scope', 'FeedService', '$interval', function ($scope, Feed, $interval) {
    $scope.loadButonText = "Load";
    $scope.loadFeed = function (e) {
        Feed.parseFeed($scope.feedSrc).then(function (res) {
            $scope.loadButonText = angular.element(e.target).text();
            if (res.data.responseStatus == 200) {
                $scope.feeds = res.data.responseData.feed.entries;
                TempFeeds = res.data.responseData.feed.entries;
                $scope.ResponseMessage = "";
                $scope.StartTimer();
            }
            else {
                $scope.ResponseMessage = res.data.responseDetails;
                $scope.feeds = {};
                TempFeeds = {};
                $interval.cancel($scope.Timer);
            }

        });
    }
    $scope.StartTimer = function () {
        $scope.Timer = $interval(function () {

            if ($('#0Content').length) {
                for (var a = 0; a < TempFeeds.length; a++) {
                    document.getElementById(a + "Content").innerHTML = TempFeeds[a].content;
                }
            }


        }, 2000);
    };

}]);

App.factory('FeedService', ['$http', function ($http) {
    return {
        parseFeed: function (url) {
            return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
        }
    }
}]);



//]]>