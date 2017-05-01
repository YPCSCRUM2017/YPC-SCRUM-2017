//Registration controller
//This controller handles registration for members

//

var path = require("path");
var htmlPath = path.join(__dirname, "./../../client/");
var requireFolder = require("./../config/req_folder.js");
var models = requireFolder("models");
var session = require("express-session");

module.exports = {

	//sends the registration page
	regPage: function(req, res, data){
		console.log(req.session.errors );
		if (req.session.errors === undefined){
			req.session.errors = {};
		}
		res.render("./views/join.ejs", {errors: req.session.errors, navBar: data.navBar});
	},

	//user tries to register
	newUser: function(req, res){
		console.log(req.body);
		var valid = true;
		var validationErrors = {};
		req.session.errors = {};

		if(req.body.first_name.length < 1){
			valid = false;
			validationErrors.first_name = "First name is required.";
		}
		if(req.body.last_name.length < 1){
			valid = false;
			validationErrors.last_name = "Last name is required.";
		}
		if(req.body.phone < 10){
			valid = false;
			validationErrors.phone = "Invalid phone number.";
		}
		if(req.body.email.length < 1){
			valid = false;
			validationErrors.email = "Email is required.";
		}

		if(req.body.pw1 !== req.body.pw2){
			valid = false;
			validationErrors.password = "Passwords do not match.";
		}
		else if(req.body.pw1.length < 8){
			valid = false;
			validationErrors.password = "Password must be at least 8 characters";
		}

		if(valid === true){
			models.registrationModel.newUser(req, res, function(err, rows, fields){
				for(key in err){
					console.log(key, ":", err[key]);
					console.log("--");
				}

				if(err != undefined && err.errno !== undefined)
				{
					switch(err.errno)
					{
						case 1062: validationErrors.email = "Email address already taken.";
						break;
					}
					req.session.errors = validationErrors;
					res.redirect('/registration');
				}
				else{
					console.log(rows, "rows from controller");
					req.session.data = {};
					// req.session.data.first_name = "test name 1";
					req.session.data.userid = rows.insertId;
					models.registrationModel.get1User(req, res, rows.insertId, function(errors, rows2, fields){
						req.session.data.first_name = rows2[0].first_name;
						res.redirect('/');
					})
				}

			});
		}
		else
		{
			console.log("Validation failed.");
			req.session.errors = validationErrors;
			res.redirect('/registration');
		}
	}
};
