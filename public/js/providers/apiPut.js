app.factory('apiPut', function(helper, $http, $httpParamSerializer) {
	var self = {};

	function sendRequest(url, query, data, callback){
		var qs = $httpParamSerializer(query);

		console.log(url + qs);
		
		$http.put(url + "?" +qs, {data: data, cache: true})
		.then(function(res){
			callback(res);
		}, function(res){
			callback(res);
		});
	}

	self.profile = function(options, callback){
		var url = helper.apiUrl + "/profile";
		var query = {};
		var body = {
			info: options.info
		};

		if (options.local){
			data.local = options.local;
		}

		sendRequest(url, query, body, callback);
	};

	self.trips = function(options, callback){
		var url = helper.apiUrl + "/trips";
		var query = {};
		var data = {
			name: options.name,
			description: options.description,
			content: options.content,
			is_published: options.is_published
		};

		sendRequest(url, query, body, callback);
	};

	return self;
});