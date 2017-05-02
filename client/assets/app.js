var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider){
$routeProvider
  .when('/', {
      templateUrl: '/partials/home.html',
      controller: 'main_controller'
  })
  .when('/blog',{
      templateUrl: '../partials/blog.html',
      controller:'main_controller'
  })
  .otherwise({
      redirectTo : '/'
  });
});
