app.controller('principalController', function($scope,$rootScope,$timeout,$http,$state,$rootScope){


  $http.get("php/checarSesion.php").success(function(data){
  $scope.sesion=data;
  console.log("sesion");
  console.log($scope.sesion);

  if($scope.sesion=="false"){
   //  $("contenidoAmostrar").hide();
    document.getElementById('contenidoGeneral').style.display = 'none';
    document.getElementById('contenidoLogin').style.display = 'block';

  }else{
    document.getElementById('contenidoGeneral').style.display = 'block';
        document.getElementById('contenidoLogin').style.display = 'none';

 
    $scope.vendedor.id=$scope.sesion;
    $rootScope.vendedor=$scope.sesion;

    /* SE TOMAN LAS NOTIFICACIONES DE ACTIVIDADES PROXIMAS DE LA BD*/
  

  }


    }).error(function(){
      alert("an unexpected error ocurred")
    });




});
