function init(dbModels) {
	var passport = require('passport');
	var LocalStrategy   = require('passport-local').Strategy;
	var FacebookStrategy = require('passport-facebook').Strategy;

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {

		dbModels.User.findById(id, function(err, user) {
            done(err, user);

        });
	});

	passport.use('local-login', 
		new LocalStrategy({
	        usernameField : 'email',
	        passwordField : 'password',
	        passReqToCallback : true
	    },
	    function(req, email, password, done) {
	        dbModels.User.findOne({ 'local.email' :  email }, function(err, user) {
	            if (err){
	                return done(err);
	            }

	            if (!user){
	                return done(null, false, req.flash('loginMessage', 'No user found.'));
	            }

	            // if the user is found but the password is wrong
	            if (!user.validPassword(password)){
	                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
	            }

	            // all is well, return successful user
	            return done(null, user);
	        });

    	}
    ));

	passport.use('local-signup', 
		new LocalStrategy({
  	        usernameField : 'email',
	        passwordField : 'password',
	        passReqToCallback : true
	    },
	    function(req, email, password, done) {
	        process.nextTick(function() {
		        dbModels.User.findOne({ 'local.email' :  email }, function(err, user) {
		            if (err){
		                return done(err);
		            }

		            if (user) {
		                return done(null, false, req.flash('signupMessage', 'Email is already in use'));
		            } else {
		                var newUser            = new dbModels.User();
		                newUser.local.email    = email;
		                newUser.local.password = newUser.generateHash(password);

		                newUser.save(function(err) {
		                    if (err) {
								next(err);
								return;
							}

		                    return done(null, newUser);
		                });
		            }

		        });    

	        });
	    }
	));

	passport.use(
		new FacebookStrategy({
			clientID: "1725478477666053",
			clientSecret: "e1c990658fcaa646360fd09bff00d289",
			callbackURL: "http://localhost:3000/auth/facebook/callback"
		}, 
		function(token, refreshToken, profile, done) {
	        process.nextTick(function() {

	            // find the user in the database based on their facebook id
	            dbModels.User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

	                // if there is an error, stop everything and return that
	                // ie an error connecting to the database
	                if (err){
	                    return done(err);
	                }

	                // if the user is found, then log them in
	                if (user) {
	                    return done(null, user); // user found, return that user
	                } else {
	                    // if there is no user found with that facebook id, create them
	                    var newUser            = new dbModels.User();

	                    // set all of the facebook information in our user model
	                    newUser.facebook.id    = profile.id; // set the users facebook id                   
	                    newUser.facebook.token = token; 
	                    newUser.facebook.displayName = profile.displayName;
	                    newUser.facebook.name  = profile.name.givenName && profile.name.familyName ? profile.name.givenName + ' ' + profile.name.familyName : ""; // look at the passport user profile to see how names are returned
	                    newUser.facebook.email = profile.emails ? profile.emails[0].value : ""; // facebook can return multiple emails so we'll take the first

	                    // save our user to the database
	                    newUser.save(function(err) {
	                        if (err) {
								next(err);
								return;
							}

	                        // if successful, return the new user
	                        return done(null, newUser);
	                    });
	                }

	            });
	        });

    	}
    ));

	return passport;
}
module.exports = init;