'use strict';

// Declare app level module which depends on filters, and services
angular.module("userProjects", [
	'ngRoute',
	'userProjects.moduleControllers',
	'userProjects.moduleDirectives',
	'userProjects.moduleServices'
]).
config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/', { 
		  templateUrl : 'views/home.html', 
		  controller : 'mainCtrl',
	})
	.when('/login', { 
		  templateUrl : 'views/login.html', 
		  controller : 'loginFormCtrl',
	})
	.when('/add', {
		templateUrl : 'views/add.html',
		controller : 'addCtrl'
	})
	.otherwise({ 
		  redirectTo: '/' 
	});
}])
.run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {
	$rootScope.$on('$routeChangeStart', function (event) {
		if (!Auth.isLoggedIn()) {
			console.log('DENY');
			event.preventDefault();
			$location.path('/login');
		}
		else {
			console.log('ALLOW');
		}
	});
}]);