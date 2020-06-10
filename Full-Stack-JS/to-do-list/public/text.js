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
