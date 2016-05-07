app.factory('apiGet', function(helper, $http, $httpParamSerializer) {
	var self = {};

	function sendRequest(url, query, callback){
		var qs = $httpParamSerializer(query);
		console.log(url + '?' + qs);
		$http.get(url + '?' + qs, {cache: true})
		.then(function(res){
			callback(res);
		}, function(res){
			callback(res);
		});
	}

	self.profile = function(options, callback){
		var url = helper.apiUrl + "/profile";
		var query = {};

		sendRequest(url, query, callback);
	};

	self.user = function(options, callback){
		var id = options.id;
		var url = helper.apiUrl + "/users/" + id;
		var query = {};

		sendRequest(url, query, callback);
	};
	
	self.tripsList = function(options, callback){
		var url = helper.apiUrl + "/profile/trips";
		var query = {};

		sendRequest(url, query, callback);
	};

	self.trip = function(options, callback){
		var id = options.id;
		var url = helper.apiUrl + "/trips/" + id;
		var query = {};

		sendRequest(url, query, callback);
	};

	self.search = function(options, callback){
		var type = options.type;
		var url = helper.apiUrl + "/profile";
		var query = {searchString: options.searchString};

		sendRequest(url, query, callback);
	};
	return self;
});