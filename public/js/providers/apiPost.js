app.factory('apiPost', function(helper, $http) {
	var self = {};

	function sendRequest(url, query, data, callback){
		var qs = $httpParamSerializer(query);

		$http.post(url + "?" + qs, {data: data, cache: true})
		.then(function(res){
			callback(res);
		}, function(res){
			callback(res);
		});
	}

	self.trip = function(options, callback){
		var url = helper.apiUrl + "/trips";
		var query = {};
		var data = {};

		sendRequest(url, query, data, callback);
	};

	return self;
});