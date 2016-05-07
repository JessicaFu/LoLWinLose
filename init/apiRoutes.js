function init(dbModels){
	var express = require("express");
	var router = express.Router();

	//setup RESTFUL api
	require('./../apiRoutes/get')(router, dbModels);
	require('./../apiRoutes/post')(router, dbModels);
	require('./../apiRoutes/put')(router, dbModels);
	require('./../apiRoutes/delete')(router, dbModels);

	return router;
}
module.exports = init;
