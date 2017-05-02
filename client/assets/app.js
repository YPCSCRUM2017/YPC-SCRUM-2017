var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider){
$routeProvider
        .when('/', {
            templateUrl: '/partials/home.html',
            // controller: 'main_controller'
        })
        .when('/blog',{

                templateUrl: '../partials/blog.html',
                // controller:'blog_controller'

              })
        .when('/events',{
              templateUrl: '../partials/events.html',
              // controller:'blog_controller'

            })
        .when('/execs',{

                templateUrl: '../partials/executives.html',
                // controller:'blog_controller'

              })
        .when('/donate',{

                templateUrl: '../partials/donate.html',
                // controller:'blog_controller'

              })
        .when('/contact',{

                templateUrl: '../partials/contact.html',
                // controller:'blog_controller'

              })
        .otherwise({
            redirectTo : '/'
        });
});
