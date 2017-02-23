process.env.NODE_ENV = process.env.NODE_ENV || 'development';

/*var mongoose = require('./config/mongoose');
var config = require('./config/config');
var express = require('./config/express');*/

var config = require('./configs/configs');
var express = require('./configs/express');
var mongoose = require('./configs/mongoose');
var nodemailer = require("nodemailer");

if (global.permission) {

} else {
	global.permission = [];
}

var db = mongoose();
var app = express();

app.listen(config.serverPort);
console.log('Server running at http://localhost:'+config.serverPort+'/');
