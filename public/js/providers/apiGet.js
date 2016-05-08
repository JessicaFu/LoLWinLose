app.factory('apiGet', function($http, $httpParamSerializer) {
	var self = {};
	var hostName = "http://localhost:3000";

	function sendRequest(url, query, callback){
		var qs = $httpParamSerializer(query);
		
		$http.get(url + '?' + qs, {cache: true})
		.then(function(res){
			callback(res);
		}, function(res){
			callback(res);
		});
	}

	self.calculate = function(options, callback){
		var url =hostName + "/calculate";
		var query = {summonerName: options.summonerName};

		sendRequest(url, query, callback);
	};

	return self;
});