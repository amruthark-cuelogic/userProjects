var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var projectSchema = Schema ({
	name: {
		type: String,
		required: true
	},
	summary: {
		type: String,
		required: true
	},
	audience: {
		type: String,
	},
	classification: {
		type: String,
		enum: ['private', 'public'],
		required: true
	},
	startdate: {
		type: Date,
		required: true
	},
	enddate: {
		type: Date
	},
	createdby: {
		type: String,
		required: true
	},
	createdon: {
		type: Date,	
		default: Date.now	
	},
	access: {
		type: String
	}
});

var userSchema = Schema ({
	name: {
		first: {type: String, required:true},
		last: {type: String, required:true}
	},
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

exports.project = mongoose.model('Project', projectSchema);
exports.user = mongoose.model('Users', userSchema);