var express = require('express');
require('dotenv').config();
var _ = require('lodash');
var async = require('async');
var moment = require('moment');
var {
  getCurrentWeather,
  getIndego,
  collectDataInterval,
  collectData,
  parseIndego
} = require('./data-collection.js');
var { db } = require('./mongo-db.js');

var app = express();

app.get('/', function(req, res) {
  res.send({ "Now": moment().format() })
})

app.get('/api/v1/stations/:kioskId', function(req, res) {
  var at = req.query.at;
  var from = req.query.from;
  var to = req.query.from;
  var frequency = req.query.frequency;

  if (req.params.kioskId === null) {
    if ( at !== null ) {
      db.weather.find(
        { $or: [ { "date_time" : at }, {"date_time" : { $gt : at } }] },
        function(err, weather) {
          if ( err ) throw err;
          console.log(weather);
        }
      )
    }
  }

  res.send({ "A": "B" })
})

app.get('/api/test/weather', function(req, res) {
  getCurrentWeather().then(function(response) {
    res.send(response);
  }).catch(function(error) {
    console.log("ERROR");
    res.send({ "Error has occured in getCurrentWeather()": error })
  });
})

app.get('/api/test/indego', function(req, res) {
  getIndego().then(function(response) {
    res.send(parseIndego(response));
  }).catch(function(error) {
    console.log("ERROR");
    res.send({ "Error has occured in getIndego()": error })
  })
})

var server = app.listen(process.env.PORT || 3000, function() {
  var port = server.address().port;
  console.log("Server listening on port " + port );
})
