var port = process.env.PORT || 3000;

//setup express middleware
var app = require("./init/middleware")();

//setup server routes
var serverRoutes = require("./init/serverRoutes")();

//define routes
app.use("/", serverRoutes);

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

	console.log("LoLWinLose listening at http://%s:%s", host, port)
});
