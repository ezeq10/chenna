'use strict';

// load modules
var express = require('express');
var mongoose = require('mongoose');
var logger = require('morgan');

// middleware: parser
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// get variables env
var env = process.env.NODE_ENV || 'development';
var port = process.env.NODE_PORT || 3000;

// app init
var app = express();

// mongoose init & connection
var dbUrl = require('./config/database').db[env];
mongoose.connect(dbUrl, function(err, res) {
  if(err) {
    console.log('[db] error connecting: ' + err);
    process.exit(0);
  }
});

// express settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());

// env settings
if (env === 'production') {
  app.use(logger('combined'));
}
if (env === 'development') {
  app.use(logger('dev'));
}
if (env === 'test') {
  mongoose.set('debug', true);
}

// secutiry settings
app.disable('x-powered-by');

// models
var models = require('./api/models')(mongoose);

// controllers
var controllers = require('./api/controllers')(app, models);

// routes
var router = express.Router();
var routes = require('./api/routes')(app, router, controllers);

// catch 404 and forward to error handler
app.use(function(req, res){
  res.status(404).send('Not Found');
});

// init server
app.listen(port, function() {
  if(env !== 'production')
    console.log('Listening on port %d in %s mode.', this.address().port, env);  
});

module.exports = app;