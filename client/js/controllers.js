//exports.load = function(file, callback) {
//	console.log("loading")
//	var fs = require('fs')
//	fs.readFile(file, 'utf8', function (err, data) {
//  		if (err) {
//    		throw err
//  		}
//  		callback(data.split('\n'))
//	})
//}

var rubiesApp = angular.module('rubiesApp', []);
 
rubiesApp.controller('RubiesCtrl', function ($scope, $http) {
 	$http.get('data/poster', { headers: { "Content-Type": "text/plain; charset=utf-8" }}).success(function(data) {
    	$scope.poster = data.split("\n");
    	console.log($scope.poster);
  	});
});