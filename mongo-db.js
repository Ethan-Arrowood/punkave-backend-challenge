var MongoClient = require('mongodb').MongoClient;

var uri = process.env.MONGODB_URI;

MongoClient.connect(uri, function(err, db) {
  if (err) throw err;
  console.log('MongoDB succesfully connected')
  db.close();
});
