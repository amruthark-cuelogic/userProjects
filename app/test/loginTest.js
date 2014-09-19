var assert = require('assert');
var mongoose = require('mongoose');
var dbURL = "mongodb://localhost/projectsdb";
require('should');
var req,res;
var loginCtrl = require('../controllers/users');

describe('login validator and controller', function() {
	
	var User = mongoose.model('Users');

	before(function(done) {
		req = {
			body : {

			},
			params : {},
			query : {},
			tempStore : {}
		};
		res = {};
		mongoose.connect(dbURL,function() {
			done();	
		});
	})
	it('should validate correct credentials', function(done) {
		req.body.username = 'amruth@gmail.com';
		req.body.password = 123456;
		loginCtrl.login(req,res,function(err) {
			if (err) throw err;
			done();
		});
	});
	it('should not validate incorrect credentials', function(done) {
		req.body.username = 'siddesh@hot-mail.com';
		req.body.password = 'pagla-launda';
		loginCtrl.login(req,res,function(err) {
			(err).should.not.eql(undefined);
			(err).should.eql('User not found');
			done();
		});
	});
})