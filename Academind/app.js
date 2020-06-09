const express = require('express');
const bodyParser = require('body-parser');

// best to store it in a variable because it holds a lot of functions
const app = express();

// set allows use to tell the ejs package our global options
// below tell the node engine that ejs will be parsing our views template
app.set('view engine', 'ejs');
// views is a commonly used name for html templates
app.set('views', 'views');

// parses the request (need to add body parser)
// the method would be the type of data like .json or urlencoded
// add the extended: false
app.use(bodyParser.urlencoded({ extended: false }));

// next tells express to run the next respond or function
app.use((request, response, next) => {
	response.setHeader('Content-Type', 'text/html');
	next();
});

// send is what you send to a user
app.use((request, response, next) => {
   const userName = request.body.username || 'Unknown User';
   // render is how you call the template 
	// the name of the template will be the string
	// the next arguement is the data you want to pass ejs to parse
	response.render('index', {
		user: userName,
	});
});

app.listen(3000);
