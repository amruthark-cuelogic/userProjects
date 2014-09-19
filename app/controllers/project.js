var Project = require("../../config/model").project;

var ObjectId = require("mongodb").ObjectID;

// server routes ===========================================================
// handle things like api calls
// authentication routes
// frontend routes =========================================================

//route to the list of the projects
exports.list = function(req, res, next) {
	Project.find(function(err, projects) {
		if(err) console.log(err);
		res.render('index', { title: 'Projects', projects: projects })
	});
}

//route to save new project
exports.add = function (req, res, next) {
	var project = new Project({
		name : req.body.name,
		summary : req.body.summary,
		audience : req.body.audience,
		classification : req.body.classification,
		startdate : req.body.startdate,
		enddate : req.body.enddate,
		createdby : req.body.createdby
	});
	project.save(function(err) {
		if (err) console.log(err);
		else res.redirect('/');	
	});
}

//route to update new project
exports.one = function (req, res, next) {
	next();
}

// route to save the updated one
exports.edit = function (req, res, next) {
	next();
}

//route to delete the project
exports.delete = function (req, res, next) {
	next();
}