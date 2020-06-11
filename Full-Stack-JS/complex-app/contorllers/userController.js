const User = require('../models/User');

exports.login = (request, respone) => {
	let user = new User(request.body);
	user
		.login()
		.then((result) => {
			request.session.user = {
				favColor: 'Blue',
				username: user.data.username,
			};
			respone.send(result);
		})
		.catch((err) => {
			respone.send(err);
		});
};

exports.logout = (request, respone) => {};

exports.register = (request, respone) => {
	let user = new User(request.body);
	user.register();
	if (user.errors.length) {
		respone.send(user.errors);
	} else {
		respone.send('Congrats, there are no errors.');
	}
};

exports.home = (request, respone) => {
	if (request.session.user) {
		respone.send('Welcome to the application');
	} else {
		respone.render('home-guest');
	}
};
