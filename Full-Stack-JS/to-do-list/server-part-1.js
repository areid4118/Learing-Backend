const express = require('express');
const app = express();
const mongodb = require('mongodb');

let db;

// npm install mongodb and add require
// mongodb.connect()
// always include useNewURLParser:
let connectionString =
	'mongodb+srv://areid4118:vRhoBbgToz7lJyh5@cluster0-gkw6f.mongodb.net/ToDoApp?retryWrites=true&w=majority';
mongodb.connect(
	connectionString,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err, client) => {
		// selects db
		db = client.db();

		// takes time the database to connect so you need to add app.listen here. Means that the app wont start listening until there is an connection
		app.listen(3000);
	},
);

app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res) {
	// find is the http read method
	// toArray coverts the data to an array this is important because the mongodb returns data in a format that is not readable to humans
	db.collection('items')
		.find()
		.toArray((err, items) => {
			// items returns an array of the objects in our database
			res.send(`
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
			</head>
			<body>
				<div class="container">
					<h1 class="display-4 text-center py-1">To-Do App</h1>
		
					<div class="jumbotron p-3 shadow-sm">
						<form action="/create-item" method="POST">
							<div class="d-flex align-items-center">
								<input
									name="item"
									autofocus
									autocomplete="off"
									class="form-control mr-3"
									type="text"
									style="flex: 1;"
								/>
								<button class="btn btn-primary">Add New Item</button>
							</div>
						</form>
					</div>
		
					<ul class="list-group pb-5">
						${items
							.map((item) => {
								return `<li
							class="list-group-item list-group-item-action d-flex align-items-center justify-content-between"
						>
							<span class="item-text">${item.text}</span>
							<div>
								<button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
								<button class="delete-me btn btn-danger btn-sm">Delete</button>
							</div>
						</li>`;
							}).join('')}
					</ul>
				</div>
			</body>
		</html>
	`);
		});
});

app.post('/create-item', function (req, res) {
	// items is the name of our collections in mongoDB
	// insertOne means create
	db.collection('items').insertOne({ text: req.body.item }, function () {
		// redirect is used to redirect a user to a new location
		res.redirect('/');
	});
});
