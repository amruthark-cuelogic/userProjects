// modules =================================================
var  express        = require('express')
	, path 			= require('path')
	,bodyParser     = require('body-parser')
	,cookieParser 	= require('cookie-parser');

// projects ==================================================
var routes = require('./app/routes'); // pass our application into our projects
var projects = require('./app/controllers/project'); // pass our application into our projects
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
app.use(cookieParser());
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

//index
app.get('*', routes.index);

// listing the projects
app.get('/projects', projects.list);

//save the new project
app.post('/projects', projects.add);

//save the updated project
app.get('/projects/:id', projects.one);

//save the updated project
app.put('/projects/:id', projects.edit);

//delete the project
app.delete('/projects/:id', projects.delete);


// start app ===============================================
app.listen(port);	
setup.bootstrap();
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app