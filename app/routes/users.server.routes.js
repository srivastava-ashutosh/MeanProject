module.exports = function(app, express) {
	var users = require('../controllers/users.server.controller');
	var router = express.Router();

	router.post('/userRegistration', users.userRegistration);
	router.post('/userLogin', users.userlogin);
	router.get('/userList', users.userList);
	router.get('/logout', users.logout);
	router.get('/userId/:id', users.findUserId);
	router.get('/userByEmail/email=:email', users.findUserByEmail);


	/* Basic Route for CRUD in Collection Book */
	router.post('/insertbook', users.InsertBook);
	router.get('/book', users.FindBook);
	router.get('/book/:id', users.FindBookById);
	router.put('/updatebook/:id', users.UpdateBook);
	router.delete('/removebook/:id', users.RemoveBook);
	app.use(config.baseApiUrl, router);
};