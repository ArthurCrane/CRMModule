(function() {
  angular.module('app')

  .config(function($urlRouterProvider, $httpProvider) {
    // add user token in every http request
    $httpProvider.interceptors.push('httpRequestInterceptor');    
    // set initial route of the app
    $urlRouterProvider.when('','/home');

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/404');



  });
})();