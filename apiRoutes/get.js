function init (router, dbModels){
	var yelp = require("yelp");
	var checkLogin = require("./../init/checkLogin");

	router.get('/profile', checkLogin, function(req, res, next) {
		dbModels.User.findById(req.user.id, function(err, user) {
			if (err) {
				next(err);
				return;
			}

			res.json(user);
		});

	});

	router.get('/users/:id', checkLogin, function(req, res, next) {
		var id = req.params.id;

		if (id === req.user.id){
			res.json(req.user);
			return;
		}

		dbModels.User.findById(id, function(err, user) {
			if (err) {
				next(err);
				return;
			}
			res.json(user);
		});

	});

	router.get('/trips/:id', checkLogin, function(req, res, next) {
		dbModels.Trip.findById(req.params.id, function(err, trip) {
		    if (err) {
		    	next(err);
				return;
		    }
		    
		    if (trip.user_id !== req.user.id){
		    	if (trip.is_published){
			    	res.json(trip);
			    }else {
			    	next(err);
					return;
			    }
			}else {
				res.json(trip);
			}
		});
	});

	router.get('/profile/trips', checkLogin, function(req, res, next) {
		dbModels.Trip.find({ user_id: req.user.id}, function(err, trips) {
			if (err) {
				next(err);
				return;
			}

			res.json(trips);
		});
	});
	
	router.get('/search/:type', function(req, res, next) {
		var type = req.params.type;

		switch(type){
			case "trips":
				dbModels.Trip.find({ "$text" : { "$search" : req.body.searchString},  "is_published": true}, { score : { $meta: "textScore" } })
				.sort({ textScore : { "$meta" : "textScore" } })
				.limit(10)
				.toArray(function(error, trips) {
					if (err) {
						next(err);
						return;
					}

					res.json(trips);
				});

				break;
			case "locations":
				var yelp = new Yelp({
					consumer_key: 'JAgkfZAX4jc80SR_K60E9Q-key',
					consumer_secret: 'vofHePtzAwK2jJURzXgv8r-ChJk',
					token: 'Mn2dbHmpDndCrK4TuKBWQljN7PqB_17x',
					token_secret: 'GXtAHABtcKG-z8Z2GPoQ0wBrzuw',
				});

				yelp.search({ 
					term: req.body.searchString, 
					location: req.body.location,
					limit: 15
				}).then(function (data) {
					res.json(data);
				}).catch(function (err) {
					next(err);
					return;
				});

				break;

		}
	});

}
module.exports = init;
