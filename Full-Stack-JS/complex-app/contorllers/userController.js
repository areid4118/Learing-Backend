const User = require('../models/User');

exports.login = (request, response) => {};

exports.logout = (request, response) => {};

exports.register = (request, response) => {
	let user = new User(request.body);
	user.register();
	if (user.errors.length) {
		response.send(user.errors);
	} else {
		response.send('No erros');
	}
};

exports.home = (request, response) => {
	response.render('home-guest');
};
