// Setting up all of my npm packages
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var axios = require('axios');

// Requiring models setting up my port and initializing express
var db = require("./models");
var PORT = 8080;
var app = express();

// Configuring middleware

// Morgan logger for logging requests
app.use(logger("dev"));
// Using Body-Parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Using express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Connect to Mongo DB
mongoose.connect("mongodb://localhost/8080");

// Routes

// Creating GET route for scraping the echoJS site
app.get("/scrape", function(req, res) {
  axios.get("https://www.bloomberg.com/").then(function(response) {
    var $ = cheerio.load(response.data);

    $("main h3").each(function(i, element) {
      var result = {};
      // Adding text and link to result object
      result.title = $(this)
      .children("a")
      .text();
      result.link = $(this)
      .children("a")
      .attr("href");
      // Creating new Article with result data
      db.Article.create(result)
      .then(function(dbArticle) {
        console.log(dbArticle);
      })
      .catch(function(err) {
        return res.json(err);
      });
    });
    // Returning indication that the scrape was successful to the client
    res.send("Hey, that scrape worked!")
  });
});


