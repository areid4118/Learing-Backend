// Express is used to built webservers
let express = require('express');
let ourApp = express();

// Don't need to know just use; this makes the users input easily accesable to the .body object
ourApp.use(express.urlencoded({ extended: false }));

// / is the url you want to be on the lookout for (/ is the base url)
// b is the callaback function that express is going to run when anytime there is a request sent to that specific url
ourApp.get('/', (request, response) => {
	// response that is sent  when the request is sucessful
	response.send(`
   <form action="/answer" method="POST">
      <p>What color is the sky on a clear an sunny day?</p>
      <input type="text" name="skyColor" autocomplete="off"/>
      <button>Submit Answer</button>
   </form>
   
   `);
});

// This is what happens when the input is submitted
ourApp.post('/answer', (request, response) => {
	if (request.body.skyColor.toLowerCase() === 'blue') {
		// request is like an api so we are going in to the body of it. Than name in an html element is whant we have access to so by calling it by skyColor we are specifying that element value
		response.send(`
         <p>Congrats, that is the correct answer!</p>
         <a href="/">Back to homepage</a>
      `);
	} else {
		response.send(`
         <p>Sorry, that is incorrect.</p>
         <a href="/">Back to homepage</a>
      `);
	}
});

ourApp.listen(3000);

// A get request is when you directly type in the url or click on a navigation link
// A post request happens when you submit a form and you want to send data to a server
