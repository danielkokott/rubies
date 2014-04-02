var rubiesApp = angular.module('rubiesApp', []);
 
rubiesApp.controller('RubiesCtrl', function ($scope, $http) {
  	var today = new Date("01-13-2014"); // Faking it's january because CSV has up to january
  	$scope.currentMonth = today.getMonth();
  	$scope.currentYear = today.getYear() + 1900;

 	$http.get('account/test', { headers: { "Content-Type": "text/plain; charset=utf-8" }}).success(function(data) {
	 	$scope.data = data;

		// var currentSaldo = data.start_saldo;
		// for (var i = data.transactions.length - 1; i >= 0; i--) {
		// 	currentSaldo = parseFloat((currentSaldo + data.transactions[i].amount).toFixed(2));
		// };
		// $scope.currentSaldo = currentSaldo;

		// $scope.currentSaldo = data.transactions[0].saldo;
		// $scope.calculateRecurring($scope.currentMonth, $scope.currentSaldo, function(newSaldo) {
		// 	$scope.currentSaldo = newSaldo;
		// 	console.log($scope.currentSaldo);
		// });

  		var temp = $scope.data.recurring.filter(recurringMonth);
  		for (var i = temp.length - 1; i >= 0; i--) {
  			var newsaldo = $scope.data.transactions[0].saldo + temp[i].amount;
  			$scope.data.transactions.unshift({
  				"year": $scope.currentYear,
  				"month": $scope.currentMonth,
  				"text": temp[i].text,
  				"amount": temp[i].amount,
  				"saldo": newsaldo
  			});
  		};
  		$scope.currentTransactions = $scope.data.transactions.filter(onlyCurrentMonth);
  		console.log($scope.currentTransactions);
  	});

  	$scope.nextMonth = function() {
  		if ($scope.currentMonth == 11) {
  			$scope.currentMonth = 0;
  			$scope.currentYear++;
  		} else {
  			$scope.currentMonth++;
  		}
  	}

  	$scope.prevMonth = function() {
  		if ($scope.currentMonth == 0) {
  			$scope.currentMonth = 11;
  			$scope.currentYear--;
  		} else {
  			$scope.currentMonth--;
  		}
  	}

  	function recurringMonth(value, index, array) {
  		return value.month.indexOf($scope.currentMonth) > -1;
  	}

  	function onlyCurrentMonth(value, index, array) {
  		return value.month === $scope.currentMonth && value.year === $scope.currentYear;
  	}

  	$scope.monthName = function(month) {
  		switch(month) {
  			case 0:
  				return "Januar";
			case 1:
  				return 'Februar';
			case 2:
				return 'Marts';
			case 3:
				return 'April';
			case 4:
				return 'Mah';
			case 5:
				return 'Juni';
			case 6:
				return 'Juli';
			case 7:
				return 'August';
			case 8:
				return 'September';
			case 9:
				return 'Oktober';
			case 10:
				return 'November';
			case 11:
				return 'December';
  		}
  	}
});