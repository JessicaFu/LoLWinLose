function init(router, dbModels){
	var checkLogin = require("./../init/checkLogin");

	router.put('/profile', checkLogin, function(req, res, next) {
		dbModels.User.findByIdAndUpdate(req.user.id, req.body.data, function (err, user) {
			if (err) {
				next(err);
				return;
			}

			res.json(user);
		});
	});

	router.put('/trips', checkLogin, function(req, res, next) {
		if (req.body.id){
			dbModels.Trip.update({_id: req.body.id}, req.body, function (err, trip) {
				if (err) {
					next(err);
					return;
				}

				res.json(trip);
			});
		}else {
			var trip = new dbModels.Trip();
			trip.user_id = req.user.id;
			trip.name = req.body.data.name;
			trip.description = req.body.data.description;
			trip.content = JSON.stringify(req.body.data.content);
			trip.is_published = req.body.data.is_published;

            trip.save(function(err) {
                if (err) {
					next(err);
					return;
				}

				res.json(trip);
            });
		}

		
	});

}
module.exports = init;
