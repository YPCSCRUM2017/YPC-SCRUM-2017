var fs = require("fs");
var path = require("path");
var controllerPath = path.join(__dirname, "./../controllers");
var controllers = {};
var session = require("express-session");
var navBar = require("../config/generateNavBar_function.js");
var mongoose = require('mongoose');
var Content = mongoose.model('Content');

fs.readdirSync(controllerPath).forEach(function(file) {
  if(file.indexOf('.js') >= 0) {
    controllers[file.slice(0, (file.length - 3))] = require(path.join(controllerPath, file));
  }
});

module.exports = function(app){
	app.post('/dummies/:test', function(req, res){


		// I'm testing the info that I'm getting from my dummy Factory
		// I console.log the body and the params just to make sure that it's
		// going through

		console.log(req.body);
		console.log(req.params.test)
	});

  app.get('/logout', function(req, res){
    req.session.destroy(function(err){
    console.log("popppping yo session");
    res.redirect('/');
    });
  });
	//testing to see if the whole chain of files works
	app.get('/test', controllers.controller_template.test);

  // show all posts (same as route for '/blog')
  // app.get('/posts/', controllers.postController.index);
  // show specific post

  // THIS STYLING IS BROKEN
  app.get("/posts/:id", function(req, res){controllers.postController.show(req, res, {navBar: navBar.generate("blog", req)});});

  // ADMIN ONLY FUNCTIONS:
    // GET REQUESTS ARE HANDLED BY ADMIN CONTROLLER
    app.get('/admin', controllers.adminController.index) // shows all posts
    app.get('/admin/posts/new', controllers.adminController.new)
    app.get('/admin/posts/:id/edit', controllers.adminController.edit)
    // Zak wants this as a modal
    app.get('/admin/posts/:id/delete', controllers.adminController.delete)
    app.get('/admin/content', controllers.adminController.editContent)
    // POST REQUESTS ARE HANDLED BY THEIR NATIVE CONTROLLERS
    app.post('/posts/:id/destroy', controllers.postController.destroy)
    app.post('/posts', controllers.postController.create)
    app.post('/posts/:id/edit', controllers.postController.update)
    app.post('/admin/content', controllers.contentController.create)
    app.post('/admin/content/:id', function(req, res) {
      controllers.contentController.update(req, res)
    })
    app.delete('/admin/content/:id', function(req, res) {
      controllers.contentController.delete(req, res)
    })

    // app.get('/s3_credentials', controllers.uploadController.credentials)
    // app.get('/upload', controllers.uploadController.index)
    // app.post('/upload/:key/destroy', controllers.uploadController.destroy)


    // user functions
    app.get('/user', controllers.userController.index)
    app.post('/user/edit/:id', controllers.userController.update, function(req, res){
      console.log(req.body);
      console.log(req.params.test);
    });

  //ejs pages
  //the second parameter of navBar.generate represents whether the vistor is logged in or not. This will be implemented soon via session.
	app.get("/", function(req, res){controllers.pageController.loadPage(req, res, "client/index.html", {navBar: navBar.generate("home", req)});});
	app.get("/executives", function(req, res){
    console.log("hello 1");
    Content.find({type:'executive'}, function(err, executives) {
        console.log("hello 2")
        console.log(executives);
        controllers.pageController.loadPage(req, res, "views/executives.ejs", {executives: executives, navBar: navBar.generate("executives", req)});
    })
  });
	app.get("/events", function(req, res){controllers.pageController.loadPage(req, res, "views/events.ejs", {navBar: navBar.generate("events", req)});});
	app.get("/blog", function(req, res){controllers.postController.index(req, res, {navBar: navBar.generate("blog", req)});});
	app.get("/contact", function(req, res){controllers.pageController.loadPage(req, res, "views/contact.ejs", {navBar: navBar.generate("contact",  req)});});
  app.get("/edit", function(req, res){controllers.userController.index(req, res);});
  app.get("/donate", function(req, res){controllers.pageController.loadPage(req, res, "views/donate.ejs",{navBar: navBar.generate("donate", req)});});
  //login and registration page routes
	app.get('/registration', function(req, res){controllers.registrationController.regPage(req, res, {navBar: navBar.generate("registration", req)})});
  app.get('/login', function(req, res){controllers.loginController.loginPage(req, res, {navBar: navBar.generate("login", req)})});

	//login and registration post routes
	app.post('/loginattempt', controllers.loginController.loginAttempt);
	app.post('/newuser', controllers.registrationController.newUser);



  // these were from a merge commit. keeping here for posterity
  // app.get('/posts/:id', controllers.postController.show)
  //
  // // need route to update db entry
  // app.post('/posts/:id/edit', controllers.postController.update)
  // // this goes to the confirm deletion page (this will be handled via modal on admin page)
  // // app.get('/posts/delete/:id', controllers.postsController.delete)
  // // this actually removes it from the database
  // app.post('/posts/:id/destroy', controllers.postController.destroy)
  //
	// //user submits registration form
	// app.post('/newuser', controllers.registrationController.newUser);
}
