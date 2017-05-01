//Login controller
var path = require("path");
var htmlPath = path.join(__dirname, "./../../client/");
var requireFolder = require("./../config/req_folder.js");
var models = requireFolder("models");
var bcrypt = require("bcryptjs");

//when you call a model function it should return a value (usually an array, the result of a query)
//after that you can make the response here in the controller

module.exports = {
  loginPage: function(req, res, data){
    console.log(req.session.errors);
    if (req.session.errors === undefined){
      req.session.errors = {};
    }
    res.render("./views/sign_in.ejs", {errors: req.session.errors, navBar: data.navBar});
  },

  loginAttempt: function(req, res) {
    console.log(req.body);
    var valid = true;
    var validationErrors = [];
    // check to see if user with this email exists:

    if(valid === true)
    {
      models.loginModel.loginAttempt(req, res, function(err, rows, fields){
        console.log("this is rows", rows);
        var passwordCheck = bcrypt.compareSync(req.body.password, rows[0].password);
        console.log(passwordCheck);
        if(err)
        {
          console.log("entered wrong email or password");
          res.redirect("/login");
        }
        else if(passwordCheck){
          req.session.data = {};
          console.log("password matches password in database");
          req.session.data.userid = rows[0].id;
          req.session.data.first_name = rows[0].first_name;
          console.log(rows, "rowsss")
          res.redirect("/");
        }
      });

    }
    // check to see whether their password matches the hashed password
    // please use bcrypt

    // if(req.body.pw1 !== )
    // if successful, send a json object in response that looks like {user_id: user.id}

    // if failed, send json {user_id: nil, errors: [error messages here]}

  // logout: function(req, res) {

  // }
  },
};
