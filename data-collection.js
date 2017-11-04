var _ = require('lodash');
var async = require('async');
var request = require('request');
var rp = require('request-promise');
var moment = require('moment');
var { db, Weather, Station } = require('./mongo-db.js');
var ObjectID = require('mongodb').ObjectID;

function collectData() {
  var weather_id = new ObjectID();
  getCurrentWeather().then(function(data) {
    var weather = new Weather({
      _id: weather_id,
      date_time: moment().format(),
      data: data
    })

    weather.save(function (err) {
      if (err) {
        clearInterval(collectDataInterval)
        throw err;
      }
    })
  })

  getIndego().then(function(data) {
    var station = new Station({
      _id: new ObjectID(),
      weather_id: weather_id,
      data: data
    })

    station.save(function (err) {
      if (err) {
        clearInterval(collectDataInterval)
        throw err;
      }
    })
  })
}

var collectDataInterval = setInterval(function () {
    collectData();
}, 3600000);

function getCurrentWeather() {
  var uri = "http://api.openweathermap.org/data/2.5/weather?q=Philadelphia&appid="
    + process.env.OPEN_WEATHER_API_KEY;

  return rp({
    uri: uri,
    json: true
  });
}

function getIndego() {
  return rp({
    uri: "https://www.rideindego.com/stations/json/",
    json: true
  })
}

module.exports.getCurrentWeather = function() { return getCurrentWeather() };
module.exports.getIndego = function() { return getIndego() };
module.exports.collectDataInterval = collectDataInterval;
exports.shutdown = function() { return clearInterval(collectDataInterval) };
