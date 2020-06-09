const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url =''

const locationStorage = {
	locations: [],
};

router.post('/add-location', (req, res, next) => {
	client.connect(function (err, client) {

		const db = client.db(dbName);

		// Insert a single document
		db.collection('inserts').insertOne({ a: 1 }, function (err, r) {
			assert.equal(null, err);
			assert.equal(1, r.insertedCount);

			// Insert multiple documents
			db.collection('inserts').insertMany([{ a: 2 }, { a: 3 }], function (err, r) {
				assert.equal(null, err);
				assert.equal(2, r.insertedCount);

				client.close();
			});
		});
	});
	locationStorage.locations.push({
		id: Math.random(),
		address: req.body.address,
		coords: { lat: req.body.lat, lng: req.body.lng },
	});
	res.json({ message: 'Stored location!' });
});

router.get('/location', (req, res, next) => {});

module.exports = router;
