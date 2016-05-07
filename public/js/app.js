var app = angular.module("TripShareApp", []);

app.service("util", function(apiGet, apiPost, apiPut, apiDelete, helper) {
	this.apiGet = apiGet;
	this.apiPost = apiPost;
	this.apiPut = apiPut;
	this.apiDelete = apiDelete;
	this.helper = helper;
});
