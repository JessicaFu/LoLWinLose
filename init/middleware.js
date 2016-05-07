
function init(passport, dbModels) {
  var express = require('express');
  var app = express();
  var session = require('express-session');
  var mongoStore = require('connect-mongo')(session);
  var favicon = require('serve-favicon');

  var engines = require('consolidate');
  var bodyParser = require('body-parser')
  var logger = require('morgan');
  var cookieParser = require('cookie-parser');
  var flash    = require('connect-flash');

  app.set('views', 'views');
  app.set('view engine', 'jade');

  app.use(express.static('client/bower_components'));
  app.use(express.static('public'));
  // uncomment after placing your favicon in /public
  //app.use(favicon(__dirname + '/public/favicon.icoreq.flash('signupMessage', 'That email is already take'));

  app.use(logger('dev'));
  app.use(cookieParser("Yummies Nomnoms Snuball"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  
  app.use(session({ 
    secret: "Yummies Nomnoms Snuball",
    key: "tripShare.sid",
    resave: false,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash()); 

  return app;
};
module.exports = init;