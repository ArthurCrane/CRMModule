app.controller('estadisticasGerenteController',['$scope','$state','$stateParams','$http','$rootScope', function($scope,$state,$stateParams,$http,$rootScope){

$scope.vendedores=[];
$http.get("php/checarSesion.php").success(function(data){
      $scope.sesion=data;
      console.log("sesion");
      console.log($scope.sesion);
      if($scope.sesion=="false")
      {       
        console.log("falsse");
       // $state.go('login');
      }
      else
      {
      	  $scope.idvendedor=$scope.sesion;
		  $http.post("php/getVendedoresdelGrupo.php",$scope.idvendedor).success(function(data){
		    	console.log(data);
		    	$scope.vendedores=data;


		         
		     }).error(function(){
		            alert("an unexpected error ocurred");
		     });


      }




         
  }).error(function(){
            alert("an unexpected error ocurred");
 });








}]);