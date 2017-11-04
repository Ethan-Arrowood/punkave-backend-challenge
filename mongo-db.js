var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uri = process.env.MONGODB_URI;
mongoose.Promise = require('bluebird');

var weatherSchema = new Schema({
  _id: Schema.Types.ObjectId,
  date_time: String,
  data: Schema.Types.Mixed
});

var stationSchema = new Schema({
  _id: Schema.Types.ObjectId,
  weather_id: Schema.Types.ObjectId,
  data: Schema.Types.Mixed
});

var Weather = mongoose.model('Weather', weatherSchema);
var Station = mongoose.model('Station', stationSchema);

mongoose.connect(uri, { useMongoClient: true });

module.exports.db = mongoose.connection;
module.exports.Weather = Weather;
module.exports.Station = Station;
