// route to handle all angular requests
exports.index = function(req, res) {
	res.sendfile('./public/index.html');
}