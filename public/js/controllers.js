angular.module('userProjects.moduleControllers', ['userProjects.moduleServices'])
.controller('navCtrl', ['$scope', '$location' , function($scope, $location){
	$scope.items = [
		{name: 'List of projects', path: '#add', pathname: '/add' },
	];
	$scope.isActive = function(item){
		if(item.pathname == $location.path()) {
			return true;
		} else {
			return false;	
		}
	};
				
}])
.controller('addCtrl', function($scope, $http, $location){
	$scope.formData = {};
	// when submitting the add form, send the data to the node API
	$scope.add = function() {
		//We need to send the incoming form data to express server.
		$http.post('/projects', $scope.formData)
			.success(function(data) {
				$location.path('/');
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
	//cancel & return back to main page.
	$scope.cancel = function() {
		$scope.formData = {};	
	};
})
.controller('MainController', function($scope) {

	$scope.tagline = 'To the moon and back!';	

})
.controller('loginFormCtrl', function($scope, $location, $timeout, validateLogin, AuthenticationService) {
	//button disabled when value is not present
	$scope.disabled = function() {
	//email and password is exist then button clickable
	if ($scope.username && $scope.password) {
		return false;
	}
		return true;
	}
	$scope.login = function() {
		validateLogin.formValidation($scope.username,$scope.password).then(function(response) {
			AuthenticationService.createCookie(response);
			$location.path("/");
		},function(error) {
			console.log(error);
			alert('Invalid details');
		});
	}	
})
.controller('logotCtrl', function($scope, $rootScope, AuthenticationService) {
	//remove cookie
	$scope.destroyCookie = function() {
		AuthenticationService.destroy();
	}
});