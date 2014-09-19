// modules =================================================
var  express        = require('express')
	, path 			= require('path')
	,bodyParser     = require('body-parser')
	,cookieParser 	= require('cookie-parser');

// projects ==================================================
var routes = require('./app/routes'); 
var projects = require('./app/controllers/project'); 
var users = require('./app/controllers/users'); 
var setup = require('./config/setup.js');


	// connect to our mongoDB database (commented out after you enter in your own credentials)
var mongoose = require('mongoose');
var dbURL = "mongodb://localhost/projectsdb";
mongoose.connect(dbURL);

var app = express();

// views
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

//Port configuration
var port = process.env.PORT || 8080; // set our port


// get all data/stuff of the body (POST) parameters
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/vnd.api+json as json
app.use(cookieParser('very secret'));
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

//index
app.get('*', [function(req,res,next){console.log(req.cookies); next();},routes.index]);

app.post('/login', users.login);

// listing the projects
app.get('/projects', [users.authenticate, projects.list]);

//save the new project
app.post('/projects', [users.authenticate, projects.add]);

//save the updated project
app.get('/projects/:id', [users.authenticate, projects.one]);

//save the updated project
app.put('/projects/:id', [users.authenticate, projects.edit]);

//delete the project
app.delete('/projects/:id', [users.authenticate, projects.delete]);


// start app ===============================================
app.listen(port);	
setup.bootstrap();
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app