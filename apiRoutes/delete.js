function init(router, dbModels){
	var checkLogin = require("./../init/checkLogin");

	router.delete('/trips/:id', checkLogin, function(req, res, next) {
		dbModels.Trip.findById(req.params.id, function(err, trip) {
			if (err || !trip) {
				next(err);
				return;
			}

			if (trip.user_id === req.user.id){
				dbModels.Trip.findByIdAndRemove(req.params.id, function(err) {
				    if (err) {
				    	next(err);
						return;
				    }
				    
				    res.sendStatus(200);
				});
			}else {
				next(err);
				return;
			}
		});

	});
}
module.exports = init;