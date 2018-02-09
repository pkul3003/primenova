var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require("body-parser");
var restify = require('restify');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// Instantiate our server
var server = restify.createServer();

var setup_server = function(app) {
      var router = require('./router.js')(app);
}

// Now, setup server 
setup_server(server);

server.listen(8082, function() {
  console.log('%s listening at %s', server.name, server.url);
});