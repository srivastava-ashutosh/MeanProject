var config = require('../../configs/configs');
var MongoClient = require('mongodb').MongoClient;

exports.getMessage = function(req, res) {
	res.json({
		message: 'Welcome to Nodejs API!'
	});
};

exports.show = function(req, res) {
	console.log("Inside show ^^^^");
	res.send({
		message: 'Welcome to  API...'
	});
};