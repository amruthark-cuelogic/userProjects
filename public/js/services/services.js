angular.module('userProjects.moduleServices', [])
.service('validateLogin', function($http){
	this.formValidation = function(username, password) {
		var loginData = {username: username, password: password};
		var postData = JSON.stringify(loginData);
		 
		var request = $http.post('/login', postData);
		return request;
	};
})
.service('AuthenticationService', function ($cookieStore) {
	this.createCookie = function (strSetValue) {
		// Set cookie
		$cookieStore.put('isLoggedin', strSetValue);
	};
	this.destroy = function () {
		//Remove cookie
		$cookieStore.remove('isLoggedin');
	};
	return this;
});	