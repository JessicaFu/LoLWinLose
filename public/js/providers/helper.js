app.factory("helper", function(){
	var self = {};

	//useful constants
	self.hostName = "http://localhost:3000";
	self.apiUrl = "http://localhost:3000/api";

	self.setProfile = function(user){
		if (user.local){
			$("#emailInput").text(user.local.email);
			$("#passwordInput").text(user.local.password);
		}

		if (user.facebook){
			$("#fbDisplayName").text(user.facebook.displayName);
			$("#fbName").text(user.facebook.name);
		}

		$("#infoInput").text(user.info);
	};
	return self;
});