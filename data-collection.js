var _ = require('lodash');
var async = require('async');
var request = require('request');
var rp = require('request-promise');

// 
// exports.collectDataInterval = setInterval(function () {
//     // query weather api
//     // send contents to DB
//
//     // query Indego api
//     // send contents to DB
//
//
//   }, 3600000);
//
// exports.shutdown = function() { return clearInterval(collectDataInterval) };

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
