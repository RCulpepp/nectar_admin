myApp.controller('usersController', ['$scope','userFactory', '$http', '$location', function($scope,userFactory, $http, $location) {
	$scope.user = userFactory.user
	$scope.regisErrors = userFactory.regisErrors
	$scope.loginErr = [];
	$scope.create = function(){
		var user = {
			first_name: $scope.first_name,
			last_name: $scope.last_name,
			email: $scope.email,
			password: $scope.password
		}
		userFactory.findUser().then(function(users){
			var exists = false;
			for(tuser in users.data){
				if (tuser.receipt_email == $scope.email){
					exists = true;
					break;
				}
			}
			if (exists){
				$scope.error = 'The email address you entered is already being used.'
			} else {
				console.log('not found')
				userFactory.create(user, function(data){
					$location.url('/dashboard')
				});
			};
		});
	}

	$scope.login = function(){
		var userData = {
			email: $scope.email,
			password: $scope.password
		}
		userFactory.login(userData, function(err){
			if(err){
				for (key in err){
					$scope.loginErr = [];
					$scope.loginErr.push(err[key]);
				}
			} else {
				$location.url('/orders/dashboard')
			}
		})
	};

	$scope.logout = function(){
		userFactory.logout().then(function(){
			console.log('in resolve')
			$location.url('/orders/dashboard')
		})
	}
}]);
