//Controller template
var path = require("path");
var htmlPath = path.join(__dirname, "./../../client/");
var requireFolder = require("./../config/req_folder.js");
var models = requireFolder("models");
var session = require("express-session");

module.exports = {
  // GET: show all blog posts on a page
  index: function(req, res, navBar){
    models.postModel.index(req,res,function(err, posts, fields){
      console.log("This is err:")
      console.log(err)
      console.log("This is posts:");
      console.log(posts);
      if(posts.length==0){res.redirect("/");}
      res.render("./views/blog.ejs", {posts:posts, navBar: navBar.navBar});
    });
  },
  // POST: create a new post
  create: function(req, res){
    console.log("create post");
    console.log("req.body:",req.body);
    if(req.body.title==="" || req.body.text===""){
      // errors = {};
      // // if (req.session.errors === undefined){
      // if(req.body.title.length < 1){
      //   errors.title = "title cannot be blank!";
      // }
      // if(req.body.text.length < 1){
      //   errors.text = "text cannot be blank!";
      // }
      // console.log(errors);
      // req.session.errors = {errors};
      // // }
      res.redirect("/admin");
    }
    else{
      models.postModel.create(req, res, function(err, posts, fields){
        console.log(posts);
        console.log("post created");
      });
      res.redirect("/admin");
    } 
  },
  // GET: show a single blog post (update styling)
  show: function(req, res, navBar){
    models.postModel.show(req,res,function(err, post, fields){
      if(post.length==0){res.redirect("/");}
      console.log("this is post",post);
      res.render("./views/post.ejs", {post:post[0], navBar: navBar.navBar});
    });
  },
  // POST: update an existing blog post
  update: function(req, res){
    console.log("create post");
    models.postModel.edit(req, res, function(err, post, fields){
      console.log("post updated");
      // need validation
    });
    res.redirect("/admin")
  },
  // POST: destroy an existing blog post
  destroy: function(req, res){
    console.log("destroy post");
    models.postModel.delete(req, res, function(err, post, fields){
      console.log("post deleted");
    });
    res.redirect("/admin")
  }
}
