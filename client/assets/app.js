var myApp = angular.module('myApp',['ngRoute', 'ngAnimate', 'ui.bootstrap']);
myApp.config(function($routeProvider){
	$routeProvider
	.when('/orders', {
		templateUrl: './partials/admin.html',
		controller: 'usersController'
	})      
	.when('/orders/dashboard', {
		templateUrl: './partials/dashboard.html'
	})
	.when('/users/new', {
		templateUrl: './partials/newUser.html',
		controller: 'usersController'
	})
	.otherwise({
		redirectTo:'/orders'
	})
});