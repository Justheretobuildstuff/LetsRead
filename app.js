var express = require('express');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var express_handlebars = require('express-handlebars');
var mongoose = require('mongoose');
var body_parser = require('body-parser');
var port = 8080;

var url = "https://www.bloomberg.com/news/articles/2018-09-05/asia-stocks-face-losses-as-em-pressure-lingers-markets-wrap?srnd=premium"

request(url, function(err, res, body) {
    var $ = cheerio.load(body);

    $('.')
})

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.listen(port);
console.log('server running on' + port);