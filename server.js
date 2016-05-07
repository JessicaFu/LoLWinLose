var port = process.env.PORT || 3000;

var dbUrl = "mongodb://admin:admin@ds015780.mlab.com:15780/tripshare";

//setup mongoDb
var dbModels = require("./init/dbConnect")(dbUrl);

//setup passport auth
var passport = require('./init/authentication')(dbModels);

//setup express middleware
var app = require("./init/middleware")(passport, dbModels);

//setup server routes
var serverRoutes = require("./init/serverRoutes")(passport, dbModels);
//setup api routes
var apiRoutes = require("./init/apiRoutes")(dbModels);
//define routes
app.use("/", serverRoutes);
app.use("/api", apiRoutes);

//add last middleware for error handling
app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.render("pages/error");
});

app.locals.basedir = __dirname;

//start server
var server = app.listen(port, function () {

	var host = server.address().address
	var port = server.address().port

	console.log("TripShare listening at http://%s:%s", host, port)
});
