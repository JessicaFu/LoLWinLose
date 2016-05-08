
function init() {
  var express = require('express');
  var app = express();
  var favicon = require('serve-favicon');

  var engines = require('consolidate');
  var bodyParser = require('body-parser')
  var logger = require('morgan');

  app.set('views', 'views');
  app.set('view engine', 'jade');

  app.use(express.static('client/bower_components'));
  app.use(express.static('public'));
  // uncomment after placing your favicon in /public
  //app.use(favicon(__dirname + '/public/favicon.icoreq.flash('signupMessage', 'That email is already take'));

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  return app;
};
module.exports = init;