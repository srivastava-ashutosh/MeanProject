module.exports = function(app, express) {
	var index = require('../controllers/index.server.controller');
	var router = express.Router();

	router.get('/getMessage', index.getMessage);
	router.get('/show', index.show);
	app.use(config.baseApiUrl, router);
};
