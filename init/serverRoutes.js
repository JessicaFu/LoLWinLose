
function init(passport, dbModels){
	var express = require("express");
	var router = express.Router();
	var checkLogin = require("./checkLogin");

	router.get('/home', function(req, res) {
		res.render('pages/home', {type: "home", user: req.user});
	});

	router.get('/create-trip', function(req, res) {
		res.render('pages/home', {type: "create-trip", user: req.user});
	});

	router.get('/', function(req, res) {
		res.redirect("/home");
	});


	//auth related
	router.get('/login', function(req, res) {
		if (req.user){
			res.redirect("/profile");
		}else {
			res.render('pages/home', {type: "login", message: req.flash('loginMessage')});
		}
	});

	router.get('/signup', function(req, res) {
		res.render('pages/home', {type: "signup", message: req.flash('signupMessage')});
	});

	router.get('/profile', checkLogin, function(req, res) {
		if (req.user){
			res.redirect("/profile");
		}else {
			res.render('pages/home', {type: "profile", user: req.user});
		}
	});

	router.get('/logout', function(req, res, next) {
		req.logout();
		req.session.destroy(function() {
		    res.clearCookie('tripShare.sid');
		    res.redirect('/');
		});
	});

    router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

	router.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect : '/home',
        failureRedirect : '/home',
        session: true
    }));

	router.post('/login', passport.authenticate('local-login', {
        successRedirect : '/home',
        failureRedirect : '/login',
        failureFlash : true,
        session: true
    }));

	router.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', 
        failureRedirect : '/signup',
        failureFlash : true,
        session: true
    }));


	return router;
}
module.exports = init;
