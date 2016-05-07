app.factory('apiDelete', function(helper, $http, $httpParamSerializer) {
	var self = {};

	function sendRequest(url, query, callback){
		var qs = $httpParamSerializer(query);

		$http.delete(url + "?" + qs, {cache: true})
		.then(function(res){
			callback(res);
		}, function(res){
			callback(res);
		});
	}

	self.trip = function(options, callback){
		var id = options.id;
		var url = helper.apiUrl + "/trips/" + id;
		var query = {}

		sendRequest(url, query, callback);
	};

	return self;
});