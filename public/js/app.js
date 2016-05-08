var app = angular.module("LoLWinLose", []);

app.service("util", function(apiGet) {
	this.apiGet = apiGet;
});
