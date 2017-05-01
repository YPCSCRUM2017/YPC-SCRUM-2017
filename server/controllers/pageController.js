//Controller template

//the following things enable this controller to access the models, and also to send html files as responses
var path = require("path");
var htmlPath = path.join(__dirname, "./../../client/");
var requireFolder = require("./../config/req_folder.js");
var models = requireFolder("models");

//when you call a model function it should return a value (usually an array, the result of a query)
//after that you can make the response here in the controller

module.exports = {
	loadPage: function(req, res, pageName, data){
		console.log(req.session, "&&");
		console.log(req.sessionID, "##")
		res.render(pageName, data);
	}
}