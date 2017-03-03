app.controller('contactoController',['$scope', '$rootScope','$state', '$stateParams' , '$http','configuracionService' , function($scope, $rootScope,$state,$stateParams,$http,configuracionService){
$rootScope.contacto={}
console.log($stateParams);
$rootScope.contacto=$stateParams;
$scope.configClientes={};
$rootScope.vendedor="gsanchez24";
//console.log($scope.contacto.nombre);

  configuracionService.getConfiguracionClientes($rootScope.vendedor)
        .then(function(data){
          $scope.configClientes= data[0]; 
          console.log($scope.configClientes);     
        }, function(data){
          console.log("Error:"+data[0]);    
        })


 $http.post("php/getContacto.php", $rootScope.contacto).success(function(data){
  $rootScope.contacto=data;
  console.log("Contacto scope");
  console.log($rootScope.contacto);
  console.log($rootScope.contacto.nombreContacto);
  console.log($rootScope.contacto.empresa);
  console.log($rootScope.contacto.puesto);
  console.log($rootScope.contacto.nombre);


$http.post("php/getActividadesContacto.php",$rootScope.contacto).success(function(data){
  $scope.actividades=data;
  console.log($scope.actividades);


}).error(function(){
    alert("an unexpected error ocurred");
});





    }).error(function(){
      alert("an unexpected error ocurred")
    });

console.log($rootScope.contacto);


}]);