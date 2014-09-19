var mongojs = require('mongojs');
var async = require('async');

var uri = "mongodb://localhost/projectsdb";

var db = mongojs.connect(uri);

var users = db.collection('users');

var currUsers = [{
	name : {
		first : 'Pranay',
		last : 'Dubey'
 	},
 	username : 'pranay@gmail.com',
 	password : 'demo'
},
{
	name : {
		first : 'Amruth',
		last : 'Rao'
	},
	username : 'amruth@gmail.com',
	password : '123456'
}]

function bootstrap() {
	async.series(currUsers.map(function(userObj) {
		return function(cb) {
			users.findOne({'username' : userObj.username},function(err,data) {
				if (err) return cb(err);
				if (data) return cb();
				users.insert(userObj, function(err,inserted) {
					if (err) return cb(err);
					cb();
				})
			})
		}
	}),function(err,results) {
		if (err) {
			console.log(err);
			return;
		}
		console.log('All users present in the db');
	})
}

exports.bootstrap = bootstrap;
