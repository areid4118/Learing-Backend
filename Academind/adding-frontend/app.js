const express = require('express');
const bodyParser = require('body-parser');

// this imports a file with a relative path (do not add a file extextinos)
const locationRoutes = require('./routes/location');

const app = express();

app.use(bodyParser.json());

// only request to the same domain are alound to fetch. If not then there will be a CORS eorr which is why we add headers
// * means any server can send a request not alway best for security
// suppose to put a url
// the allow methods is the only methods allowed
// always need to add options with a POST
// Always add these to avoide coords
app.use((request, response, next) => {
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
	response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

app.use(locationRoutes);

app.listen(3000);
