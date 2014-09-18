var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var projectSchema = Schema ({
	project_name: {
		type: String,
		required: true
	},
	project_summary: {
		type: String,
		required: true
	},
	project_audience: {
		type: String,
	},
	project_classification: {
		type: enum,
		required: true
	},
	project_startDate: {
		type: Date
		required: true
	},
	project_endDate: {
		type: Date
	},
	project_createdBy: {
		type: String,
		required: true
	},
	project_createdOn: {
		type: Date		
	},
	project_access: {
		type: String,
		required: true
	}
});

var userSchema = Schema ({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		required: true
	}
	created_on: {
		type: Date
		default: Date.now
	}

});

module.exports = mongoose.model('Project', postSchema);
module.exports = mongoose.model('User', userSchema);