var User = require("../../config/model").user;
var generator = require('password-generator');


exports.login = function(req, res) {
	var username = req.body.username || '';
    var password = req.body.password || '';
 
    if (username == '' || password == '') {
        return res.send(401);
    }

	User.findOne({username: req.body.username}, function(err, user){
		if (err) {
            console.log(err);
            return res.send(401);
        }
        var randomCookie = GenerateCookie();
        res.send(randomCookie);
	});
}

function GenerateCookie() {
	var cookieHash = generator();
	return cookieHash
}

exports.authenticate = function(req, res, next) {
	var cookie = req.cookies.isLoggedin;
	if(cookie.data && (cookie.status === 200)) {
		return next();
	}
	res.redirect('/login');
}