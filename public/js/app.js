'use strict';

// Declare app level module which depends on filters, and services
angular.module("userProjects", [
	'ngRoute',
	'ngCookies',
	'userProjects.moduleDirectives',
	'userProjects.moduleServices',
	'userProjects.moduleControllers'
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
.run(['$route', '$rootScope', '$location', '$cookieStore', function ($route, $rootScope, $location, $cookieStore) {
	var original = $location.path;
	$location.path = function(path, avoidReload) {
		var getCookie = $cookieStore.get('isLoggedin');
		var paths = window.location.href.toString().split('/');
		var urlpath = paths[paths.length - 1];
		//if cookie is not set
		if ((!getCookie && path && path !== "/login") || (!getCookie && urlpath !== "login")) {
			return original.apply($location, ['/login']);
		}
		$rootScope.getCookie = getCookie;
		if (avoidReload) {
			var lastRoute = $route.current;
			//$locationChangeSuccess occurs before the route is matched and the controller invoked
			$rootScope.$on('$locationChangeSuccess ', function() {
				$route.current = lastRoute;
			});
		}
		return original.apply($location, [path]);
	};
}]);