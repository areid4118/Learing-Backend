const express = require('express');
const mongodb = require('mongodb');
const app = express();
const sanitizeHTML = require('sanitize-html');

app.use(express.static('public'));

let db;

const connectionString =
	'mongodb+srv://areid4118:XqvO4mJS2OCBsOn1@cluster0-gkw6f.mongodb.net/Redo-To-Do-List?retryWrites=true&w=majority';

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongodb.connect(
	connectionString,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err, client) => {
		db = client.db();
		app.listen(3000);
	},
);

app.get('/', (request, response) => {
	db.collection('items')
		.find()
		.toArray((err, databaseResults) => {
			response.send(`
					<!DOCTYPE html>
					<html>
						<head>
							<meta charset="UTF-8" />
							<meta name="viewport" content="width=device-width, initial-scale=1.0" />
							<title>Simple To-Do App</title>
							<link
								rel="stylesheet"
								href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
								integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
								crossorigin="anonymous"
							/>
							<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js" defer></script>
							<script src="/browser.js" defer></script>
						</head>
						<body>
							<div class="container">
								<h1 class="display-4 text-center py-1">To-Do App</h1>
					
								<div class="jumbotron p-3 shadow-sm">
									<form action="/create-item" method="POST">
										<div class="d-flex align-items-center">
											<input id="submitInput" name="submitText" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;" />
											<button class="btn btn-primary">Add New Item</button>
										</div>
									</form>
								</div>
					
								<ul id="item-list-group" class="list-group pb-5">
								${databaseResults
									.map((listItem) => {
										return `
												<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
												<span class="item-text">${listItem.text}</span>
												<div>
													<button data-id="${listItem._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
													<button data-id="${listItem._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
												</div>
												</li>
											`;
									})
									.join(' ')}
								</ul>
							</div>
						</body>
					</html>	
			`);
		});
});

app.post('/create-item', (request, response) => {
	const safeText = sanitizeHTML(request.body.text, { allowedTags: [], allowedAttributes: {} });
	db.collection('items').insertOne({ text: safeText }, (err, info) => {
		response.json(info.ops[0]);
	});
});

app.post('/update-item', (request, response) => {
	const safeText = sanitizeHTML(request.body.text, { allowedTags: [], allowedAttributes: {} });
	db.collection('items').findOneAndUpdate(
		{ _id: new mongodb.ObjectID(request.body.id) },
		{ $set: { text: safeText } },
		() => {
			response.send(`Success`);
		},
	);
});

app.post('/delete-item', (request, response) => {
	db.collection('items').deleteOne({ _id: new mongodb.ObjectID(request.body.id) }, () => {
		response.send('Success');
	});
});
