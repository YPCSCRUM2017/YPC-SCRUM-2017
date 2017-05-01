// adminController.js
var path = require("path");
var mongoose = require('mongoose');
var Content = mongoose.model('Content');
var htmlPath = path.join(__dirname, "./../../server/");
var requireFolder = require("./../config/req_folder.js");
var models = requireFolder("models");
var session = require("express-session");

module.exports = {
  // GET: take admin to all blog posts
  index: function(req, res){
    models.postModel.index(req,res,function(err, posts, fields){
      console.log(posts);
      res.render("./views/admin/index.ejs", {posts:posts, errors: req.session.errors});
    });
  },
  // GET: take admin to create a new blog post page
  new: function(req, res){
    res.render("./views/admin/posts/create.ejs");
  },
  // GET: take admin to update an existing post page
  edit: function(req, res){
    console.log("\n\n\n GET EDIT PAGE");
    models.postModel.show(req,res,function(err, post, fields){
      console.log(post);
      res.render("./views/admin/posts/edit.ejs", {post:post[0]});
    });
  },
  // GET: take admin to delete confirm (Zak wants a modal)
  delete: function(req, res){
    console.log("\n\n\n GET DELETE PAGE");
    models.postModel.show(req,res,function(err, post, fields){
      console.log(post);
      res.render("./views/admin/posts/delete.ejs", {post:post[0]});
    });
  },
  editContent: function(req, res) {
    Content.find({type: 'executive'}, function (err, content) {
      console.log(content)
      res.render("./views/admin/content.ejs", {
        executives: content
      })
    });
  }
}
