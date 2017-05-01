// postModel.js

//require these two things to be able to do queries
var connection = require('../config/mysql.js');
var doQuery = require('../config/doquery_function.js');
//the doQuery function is available. it takes a string which is the query, and an optional callback function
//the callback function takes one argument, rows. it is an array returned from a successful query.
//the callback function is only called when the query is successful.
//the purpose of the callback function is to enable you to modify the results of the query.
//this is usually not necessary so 99% of the time you shouldn't need a callback at all.

module.exports = {
  // get all posts
  index: function(req, res, callback){
    console.log("index model function");
    //you can make a query by calling your callback, which you write in the controller.
    doQuery(`select * from posts`, callback);
  },
  // show a single post
  show: function(req, res, callback){
    var test = `select * from posts where posts.id = ${req.params.id}`;
    doQuery(test, callback);
  },
  // create a new post
  create: function(req, res, callback){

    console.log(req.body);

    doQuery("insert into posts (title, body, photo_link, created_at, updated_at) values ('"+ req.body.title + "', '" + req.body.text + "', '"+ req.body.s3Url + "', now(), now())", callback);
  },
  // edit a post
  edit: function(req, res, callback){
    console.log(req.body);
    if(req.body.s3Url == undefined){
      console.log("entered here");
      var test = `update posts set title="${req.body.title}", body="${req.body.text}", photo_link=NULL, updated_at=NOW() WHERE posts.id ="${req.params.id}"`;
    }
    else{
      var test = `update posts set title="${req.body.title}", body="${req.body.text}", photo_link="${req.body.s3Url}", updated_at=NOW() WHERE posts.id ="${req.params.id}"`;
    }
    console.log("*************************");
    console.log(test);
    console.log("*************************");
    doQuery(test, callback);
  },
  // delete a post
  delete: function(req, res, callback){
    var test = `DELETE FROM posts WHERE posts.id ="${req.params.id}"`;
    console.log(test);
    doQuery(test, callback);
  },
}
