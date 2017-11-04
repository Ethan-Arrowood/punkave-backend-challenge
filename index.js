var express = require('express');
require('dotenv').config();
var _ = require('lodash');
var async = require('async');
var { getCurrentWeather, getIndego } = require('./data-collection.js');

var app = express();

// app.use(function (req, res, next) {
//   console.log(req);
//   console.log(res);
//   next();
// });

app.get('/', function(req, res) {
  res.send({ "Hello": "World" })
  //collectDataInterval();
})

app.get('/weather', function(req, res) {
  getCurrentWeather().then(function(response) {
    res.send(response);
  }).catch(function(error) {
    console.log("ERROR");
    res.send({ "Error has occured in getCurrentWeather()": error })
  });
})

app.get('/indego', function(req, res) {
  getIndego().then(function(response) {
    res.send(response);
  }).catch(function(error) {
    console.log("ERROR");
    res.send({ "Error has occured in getIndego()": error })
  })
})

app.listen(3000, function() {
  console.log("Server listening on port 3000.")
})
