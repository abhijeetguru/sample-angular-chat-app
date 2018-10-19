chatApp.config(function($routeProvider){
    $routeProvider.when("/",{
        templateUrl:"/View/Home.html",
        controller:"HomeController"
    });
});