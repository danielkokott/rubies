var rubiesApp = angular.module('rubiesApp', []);
 
rubiesApp.controller('RubiesCtrl', function ($scope, $http) {
 	$http.get('data/poster', { headers: { "Content-Type": "text/plain; charset=utf-8" }}).success(function(data) {
	 	$scope.poster = data.poster;
  	});

  	var today = new Date();
  	$scope.thisMonth = today.getMonth() + 1;
});