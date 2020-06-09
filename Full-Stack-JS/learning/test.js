let http = require('http');

let ourApp = http.createServer((request, response) => {
	if (request.url == '/') {
		response.end('Hello, and welcome to our website.');
	}

	if (request.url == '/about') {
		response.end('Thank you for the interst in our company');
	}

	response.end('We cannot find the page you are looking for.');
});
ourApp.listen(3000);

