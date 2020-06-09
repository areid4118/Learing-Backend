const express = require('express');
const app = express();
const mongodb = require('mongodb');

let db;

// makes the information in a specific folder avalible to our server
app.use(express.static('public'));

let connectionString =
	'mongodb+srv://areid4118:vRhoBbgToz7lJyh5@cluster0-gkw6f.mongodb.net/ToDoApp?retryWrites=true&w=majority';
mongodb.connect(
	connectionString,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err, client) => {
		db = client.db();
		app.listen(3000);
	},
);

// express.json is used to get the axios request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// the _id in the html is from the data
app.get('/', function (req, res) {
	db.collection('items')
		.find()
		.toArray((err, items) => {
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
				<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js" defer></script>
				<script src="/browser.js" defer></script>
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
								<button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
								<button class="delete-me btn btn-danger btn-sm">Delete</button>
							</div>
						</li>`;
							})
							.join('')}
					</ul>
				</div>
			</body>
		</html>
	`);
		});
});

app.post('/create-item', function (req, res) {
	db.collection('items').insertOne({ text: req.body.item }, function () {
		res.redirect('/');
	});
});

// this is how we can get the request from axios
app.post('/update-item', (req, res) => {
	// findOneAndUpdate finds one item in our colleciton and updates it
	// first arguemnt is what document you want to update
	// first argument must be written like shown with the new keyword look below
	// second arguemnt is what you want to update on that specific docuement
	// second argumenet must have $set: and the object properties you want to update
	// third arugment is the function that will get called once that database action is complete
	db.collection('items').findOneAndUpdate(
		{ _id: new mongodb.ObjectID(req.body.id) },
		{ $set: req.body.text },
		() => {
			res.send('Sucess');
		},
	);
});
