'use strict';

// load modules
var express         = require('express');
var mongoose        = require('mongoose');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var bcrypt          = require('bcrypt');
var jwt             = require('jsonwebtoken');
var request         = require('request-promise');
var multer          = require('multer');
var logger          = require('morgan');


// get env vars
var env   = process.env.NODE_ENV || 'development';
var port  = process.env.NODE_PORT || 3000;

// app init
var app = express();

// express settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(express.static(__dirname + '/public'));
app.use(multer({
  dest: './public/uploads'
}));
app.disable('x-powered-by');

// template settings
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.set('views',__dirname+'/public/views')

// env settings
if (env === 'production') {
  app.use(logger('combined'));
} else {
  app.use(logger('dev'));
  mongoose.set('debug', false);
}

// mongoose init & connection
var dbUri = require('./config/database').db[env];
mongoose.connect(dbUri, function (err, res) {
  if (err) {
    console.log('[db] error connecting: ' + err);
    process.exit(0);
  }
});

// models
var models = require('./app/models')(mongoose);

// controllers
var controllers = require('./app/controllers')(app, models);

// routes
var router = express.Router();
var routes = require('./app/routes')(app, router, controllers);

// catch 404 and forward to error handler
app.use(function (req, res) {
  res.status(404).send('Not Found');
});

// init server
app.listen(port, function () {
  if (env !== 'production')
    console.log('Listening on port %d in %s mode.', this.address().port, env);  
});

module.exports = app;