(function() {
  angular.module('app.login').config(config);

  config.$inject = ['$stateProvider']; 
  
  function config ($stateProvider) {

    $stateProvider
    
    .state('home', {
        url:"/home",
        views:{
          "appContent":{
            templateUrl: "components/login/login.html",
           // controller: "HomeController"
          }
        }        
    })   

  }


})();