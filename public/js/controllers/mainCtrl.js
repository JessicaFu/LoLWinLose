app.controller('mainCtrl', function($scope, util){
	var apiGet = util.apiGet;
	var apiDelete = util.apiDelete;
	var apiPut = util.apiPut;
	var helper = util.helper;

	//other's
	$scope.others_id = "570e0b0139f728db0f467aa8";
	$scope.others_email = "user1";

	//your's
	$scope.profile = {};
	$scope.tripsList = [];
	$scope.your_trip = {
		name: "my trip",
		description: "temp",
		content: {a: "wut"},
		is_published: false
	};

	$scope.getProfile = function(){
		apiGet.profile(null, function(res){
			helper.setProfile(res.data);
			$scope.profile = res.data;
		});
	}

	$scope.saveProfile = function(){
		apiPut.profile($scope.profile, function(res){
			$("#profileStatus").text("Saved!");
		});
	}

	$scope.getTrips = function(){
		apiGet.tripsList(null, function(res){
			$scope.tripsList = res.data;
		});
	}

	$scope.saveTrip = function(){
		apiPut.trips($scope.your_trip, function(res){
			$("#tripStatus").text("Saved!");
		});
	}

	$scope.editTrip = function(index){
		var trip = $scope.tripsList[index];
		apiGet.trip({id: trip._id}, function(res){
			$scope.your_trip = res.data;
		});
	}

	$scope.deleteTrip = function(index){
		var trip = $scope.tripsList[index];
		apiDelete.trip({id: trip._id}, function(res){
			$scope.tripsList.splice(index, 1);
		});
	}

	$scope.getUser = function(){
		apiGet.user({id: $scope.others_id}, function(res){
			helper.setProfile(res.data);
		});
	}

});