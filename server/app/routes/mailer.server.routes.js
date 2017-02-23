module.exports = function(app, express) {
	var mailer = require('../controllers/mailer.server.controller');
	var router = express.Router();


	router.post('/sendmail', mailer.SendMail);
	app.use(config.baseApiUrl, router);

}