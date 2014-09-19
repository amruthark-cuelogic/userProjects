angular.module('userProjects.moduleControllers', [])
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
/*.controller('listCtrl', function ($scope) {
	$http.get('/projects')
	.success(function(data, status, headers, config){

	})
	.error(function(data){
		console
	})
})*/
.controller('MainController', function($scope) {

	$scope.tagline = 'To the moon and back!';	

})
.controller('loginFormCtrl', ['$scope','$location','Auth', function($scope, $location, Auth) {
  // hide error messages until 'submit' event
	$scope.submitted = false;
	$scope.submit = function() {
		if($scope.username && $scope.password) {
			var valid = Auth.authorize($scope.username, $scope.password);
			if(valid) { 
				$location.path('/');
			} else {
				alert("Invaid Login Crendentials");
			}
		} else {
			alert("Please enter valid username and password");
		}
	};
}]);