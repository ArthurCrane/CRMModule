
app.controller('navegacionController', function($scope,$rootScope,$timeout,$http,$state,$rootScope){
$rootScope.vendedor="";

console.log("almost there");

$scope.tipoPagVenta=function(notificacion){

  $rootScope.comeFromNotificaciones=true;
  $rootScope.notificacion=notificacion;
  console.log(notificacion);
}

console.log("controlador NAVEGACION");
$rootScope.notificaciones=[];
$scope.vendedor={};

  $http.get("php/checarSesion.php").success(function(data){
  $scope.sesion=data;
  console.log("sesion");
  console.log($scope.sesion);

  if($scope.sesion=="false"){
   //  $("contenidoAmostrar").hide();
   // document.getElementById('contenidoAmostrar').style.display = 'none';

   $state.go('login');

  }else{
    //document.getElementById('contenidoAmostrar').style.display = 'block';

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 
    var today= yyyy+'/'+mm+'/'+dd;
  //  var today = dd+'/'+mm+'/'+yyyy;
    console.log("dia");
    console.log(today);
    $scope.vendedor.id=$scope.sesion;
    $rootScope.vendedor=$scope.sesion;
    $scope.vendedor.diaActual=today;
    console.log("vendedor");
    console.log($scope.vendedor);
    /* SE TOMAN LAS NOTIFICACIONES DE ACTIVIDADES PROXIMAS DE LA BD*/
     $http.post("php/getNotificaciones.php", $scope.vendedor).success(function(data,status,headers,config){
                    console.log("Notificaciones");
                    console.log(data);
                    $rootScope.notificaciones=data;
                    $rootScope.contador=$scope.notificaciones.length;
                    console.log("CONTADOR");
                    console.log($scope.contador);
                })

  }


    }).error(function(){
      alert("an unexpected error ocurred")
    });




$scope.cerrarSession=function(){
	console.log("cerrando sesion");

	$http.put('php/cerrarSession.php').success(function(data){
		console.log(data);
		if(data==0){
			console.log("dentro");
			$state.go("login");
		}

	});

}

 $scope.cerrarSession = function (e) {
       $http.put('php/cerrarSession.php').success(function(data){
    console.log(data);
    if(data==0){
      console.log("dentro");
      $state.go("login");
    }

    });
}

       




$scope.x=function(notificacion){
  console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

       


}








});