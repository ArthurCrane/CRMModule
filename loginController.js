

app.controller('loginController',['$scope','$timeout','$http','$state', '$location','$rootScope','$modal', function($scope, $timeout,$http,$state,$location,$rootScope,$modal){

  $scope.datosUsuario={};
  $scope.nuevoUsuario={};
  $scope.msjErrorUsuario="";
  $scope.msjErrorCorreo="";
  $scope.msjError="";




  $http.get("php/checarSesion.php").success(function(data){
  $scope.sesion=data;
  console.log("sesion");
  console.log($scope.sesion);

  if($scope.sesion=="false"){

    document.getElementById('contenidoLogin').style.display = 'block';

  }else{



    document.getElementById('contenidoLogin').style.display = 'none';
    $state.go('home');


  }


    }).error(function(){
      alert("an unexpected error ocurred")
    });





  $scope.verificarUsuario=function()
  {
  	console.log("funcion verificar");



       $http.put('php/getUsuario.php', $scope.datosUsuario).success(function(data){
           //  $scope.ventaAModificar = data;
             
            console.log(data);

            if(data.length!=0){
              console.log("Usuario correcto");
             $state.go('home');
           //   $rootScope.usuario="gsanchez";
             // console.log("actualizando usuario");
              //console.log($rootScope.usuario);

            }
            else{

                console.log("Usuario incorrecto");
                $scope.msjError="Usuario o contraseña incorrectos, ingresa datos válidos"

            }
          });  




}

$scope.guardarUsuario=function()
{
  console.log($scope.nuevoUsuario.nombre);
   $scope.msjErrorNombre="";  
   $scope.msjErrorContrasena="";
   $scope.msjErrorCorreo="";  
   $scope.msjErrorUsuario="";

var error=false;

if($scope.nuevoUsuario.nombre==undefined){
  $scope.msjErrorNombre="Ingresa un nombre";
  error=true;
}else{
  if($scope.nuevoUsuario.nombre.length>50){
    $scope.msjErrorNombre="Ingresa un nombre con menos caracteres";
    error=true;
  }

}
if($scope.nuevoUsuario.usuario==undefined){
  $scope.msjErrorUsuario="Ingresa un usuario";
  error=true;
}else{
  if($scope.nuevoUsuario.usuario.length>15){
    $scope.msjErrorUsuario="Ingresa un usuario con menos de 15 caracteres";
    error=true;
  }

}
if($scope.nuevoUsuario.contrasena==undefined){
  $scope.msjErrorContrasena="Ingresa una contraseña";
  error=true;
}else{
  if($scope.nuevoUsuario.contrasena.length>20){
    $scope.msjErrorContrasena="Ingresa una contraseña con menos de 20 caracteres";
    error=true;
  }

}

if($scope.nuevoUsuario.correo==undefined){
  $scope.msjErrorCorreo="Ingresa un correo";
  error=true;
}else{
  if($scope.nuevoUsuario.correo.length>30){
    $scope.msjErrorCorreo="Ingresa un correo con menos caracteres";
    error=true;
  }

}

console.log(error);






if(!error){

       $http.put('php/insertarUsuario.php', $scope.nuevoUsuario).success(function(data){
           //  $scope.ventaAModificar = data;
             
            console.log("Insertado a la BD.");
            console.log(data);
            var op=data;
            if(op==1)
              $scope.msjErrorUsuario="El usuario ya existe";
            if(op==2)
              $scope.msjErrorCorreo="El correo ya existe";
            if(op==12){
              console.log("12 if");
              $scope.msjErrorUsuario="El usuario ya existe";
              $scope.msjErrorCorreo="El correo ya existe";

            }
            if(op==3){
              $scope.nuevoUsuario={};
              $("[data-dismiss=modal]").trigger({ type: "click" });
              $scope.msjErrorCorreo="";  
              $scope.msjErrorUsuario="";
              alert("Usuario Registrado" );




            }





                  //var obj=$scope.NuevoUsuario;

  //                $scope.productos.push(obj);
//                  $scope.NuevoProducto={};
              });

     }


}



}]);
