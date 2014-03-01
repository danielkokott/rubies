var rubiesApp = angular.module('rubiesApp', []);
 
rubiesApp.controller('RubiesCtrl', function ($scope, $http) {
 	$http.get('account/test', { headers: { "Content-Type": "text/plain; charset=utf-8" }}).success(function(data) {
	 	$scope.transactions = data.transactions;
  	});

  	var today = new Date();
  	$scope.thisMonth = today.getMonth() + 1;
});