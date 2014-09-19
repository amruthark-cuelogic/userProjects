angular.module('userProjects.moduleServices', [])
.factory('Auth', function(){
var user;
var pass;
var authorized;
var UserDetails = [
		{ username: 'amruthrao4u@gmail.com', password: '123456'},
		{ username: 'amrutha.kasamalla@cuelogic.co.in', password: '124578'}
	   ];
return{
    isLoggedIn : function(){
        return authorized;
    },
	authorize : function(username, password) {
		var valid = false;
			angular.forEach(UserDetails,function(value,index){
				if(value.username === username && value.password === password)	{							 
					valid = true;
				}
            })
			authorized = valid;
			return valid;
		//return username & password;
	}
  }
});