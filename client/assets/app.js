var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider){
$routeProvider
  .when('/blog',{
          console.log("HIIIIIIIIIIIIII");
          templateUrl: '../partials/blog.html',
          controller:'blog_controller'

        })
});
