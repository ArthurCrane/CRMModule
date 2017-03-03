
app.controller('ventaController',['$scope','$state','$stateParams','$http','$rootScope','$location','configuracionService',function($scope,$state,$stateParams,$http,$rootScope,$location,configuracionService){

    $scope.picker = { opened: false };        
    $scope.openPicker = function() {
          $timeout(function() {
            $scope.picker.opened = true;
          });
    };
        
    $scope.closePicker = function() {
          $scope.picker.opened = false;
    };


	$rootScope.venta={};
  $scope.ventaAModificar={};
  $scope.ventaAModificar.descuento=0;

  $rootScope.actividadModificada={};
  $rootScope.actividadActualizada={};
  $rootScope.venta={};
	$rootScope.venta.nombre=$stateParams.nombre;
  $scope.NuevaActividad={};
  $scope.NuevaActividad.anotaciones="";
  $scope.configVentas={};
  $scope.checkTodos=false;
  $scope.totalProductos=0;

configuracionService.getConfiguracionVenta($rootScope.user)
              .then(function(data){
                $scope.configVentas= data[0];
                console.log($scope.configVentas);
                  if($scope.configVentas.descuento==false)
                    $scope.ventaAModificar.descuento=0;

              
              }, function(data){
                    console.log("Error:"+data[0]);    
              })




//   $scope.ventas2=[];
  $http.get("php/checarSesion.php").success(function(data){
  $scope.sesion=data;
  console.log("sesion");
  console.log($scope.sesion);
  $rootScope.user=$scope.sesion;

  if($scope.sesion=="false"){
   //  $("contenidoAmostrar").hide();
    document.getElementById('contenidoAmostrar1').style.display = 'none';

    console.log("falsse");
   $state.go('login');

  }else{
    document.getElementById('contenidoAmostrar1').style.display = 'block';

    console.log("truee");

          $scope.contactos=[];
          $http.put("php/contactos.php",{idvendedor:$rootScope.user}).success(function(data){
          $scope.contactos=data;
           
            var availableTagsContactos=[];
           
            }).error(function(){
              alert("an unexpected error ocurred")
            });
  }


    }).error(function(){
      alert("an unexpected error ocurred")
    });







  $scope.productos=[];
  $http.get("php/productos.php").success(function(data){
    $scope.productos=data;
     for(var i=0;i< $scope.productos.length;i++){
              console.log($scope.productos[i]);
              $scope.productos[i].isSelected=false;
              $scope.productos[i].cantidad=0;
            }



  

   
  }).error(function(){
      alert("an unexpected error ocurred")
  });





  $scope.ventas=[];
  $http.post("php/getVenta.php",$rootScope.venta.nombre).success(function(data){
  $rootScope.venta=data[0];
  console.log("Prueba de las ventas");
  console.log(data);
  for(var i=0; i<$scope.productos.length;i++){
    for(var j=0; j<$rootScope.venta.productos.length;j++){
    
      if($scope.productos[i].idProducto==$rootScope.venta.productos[j].idProducto){
        $scope.productos[i].isSelected=true;
        $scope.productos[i].cantidadAnterior=$rootScope.venta.productos[j].cantidad;
        $scope.productos[i].cantidad=$rootScope.venta.productos[j].cantidad;
        $scope.productos[i].total=$scope.productos[i].cantidad*$scope.productos[i].precio;
      }
    }
  }

  console.log($scope.productos);


  /*
  for(i = 0; i < $scope.ventas.length; i++) 
  {
    if($scope.ventas[i].nombre== $rootScope.venta.nombre)
    {
      $rootScope.venta=$scope.ventas[i];
      console.log($rootScope.venta);
    }

    var fecha=new Date($rootScope.venta.fechaCierre);
    $rootScope.venta.fechaCierre=fecha;

  }

  */
  console.log($rootScope.venta);

  $scope.ventaAModificar=$rootScope.venta;


    }).error(function(){
      alert("an unexpected error ocurred")
    });

      $scope.seleccionarTodos=function(){
        console.log("CHECK");
        console.log($scope.checkTodos);
        if($scope.checkTodos==true){
          $scope.checkTodos=true;
          for(var i=0;i<$scope.productos.length;i++)
            $scope.productos[i].isSelected=true;
          
        }else{
          $scope.checkTodos=false;
          for(var i=0;i<$scope.productos.length;i++){
            console.log($scope.productos[i]);
             $scope.productos[i].isSelected=false;
          }

           

        }
      };

$scope.calcularTotal=function(producto){
    producto.total=producto.precio*producto.cantidad;
      console.log(producto.total);
      $scope.ventaAModificar.total=0;

      for(i=0;i<$scope.productos.length;i++){
        if($scope.productos[i].isSelected)
          $scope.ventaAModificar.total=($scope.productos[i].precio*$scope.productos[i].cantidad)+$scope.ventaAModificar.total;
      }

}


$scope.checarValor=function(actividad){
  return actividad.changeColor;

}
  $scope.actividades=[];
  $http.get("php/getActividades.php").success(function(data){
  $scope.actividadesGenerales=data;
  for(i=0; i < $scope.actividadesGenerales.length; i++)
  {
    if($scope.actividadesGenerales[i].idventa==$rootScope.venta.id){
       var fecha=new Date($scope.actividadesGenerales[i].fecha);
           fecha.setDate(fecha.getDate() + 1);

      var hora = new Date($scope.actividadesGenerales[i].hora);
       //console.log($scope.actividadesGenerales[i].hora);
       console.log(hora);
      //console.log($scope.actividadesGenerales[i].fecha);

      $scope.actividadesGenerales[i].fecha=fecha;
      $scope.actividadesGenerales[i].hora=hora;
      console.log(fecha);
      console.log($scope.actividadesGenerales[i].hora);

      console.log($rootScope.comeFromNotificaciones);

      if($rootScope.comeFromNotificaciones){
        console.log($scope.actividadesGenerales[i].id);
        console.log($rootScope.notificacion.id);
          
          if($scope.actividadesGenerales[i].id==$rootScope.notificacion.id){
            $scope.actividadesGenerales[i].changeColor=true;
          }else{
                $scope.actividadesGenerales[i].changeColor=false;

          }

      }


   // $scope.actividadesGenerales[i].hora=hora;

      $scope.actividades.push($scope.actividadesGenerales[i]);
      console.log("llenando actividades :P");



    }
  }

console.log("Actividades");
  console.log($scope.actividades);

    }).error(function(){
      alert("an unexpected error ocurred")
    });

$scope.editarActividad=function(actividad){
console.log("FUNCION EDITAR ACTIVIDAD");
console.log(actividad.hora);
var actividad=actividad;

 $rootScope.actividadModificada.id=actividad.id;
 $rootScope.actividadModificada.tipo=actividad.tipo;
 $rootScope.actividadModificada.status=actividad.status;
 $rootScope.actividadModificada.fecha=actividad.fecha;
 $rootScope.actividadModificada.hora=actividad.hora;
 $rootScope.actividadModificada.duracion=actividad.duracion;
 $rootScope.actividadModificada.anotaciones=actividad.anotaciones;


 $rootScope.actividadActualizada=actividad;

 console.log($rootScope.actividadModificada);
 console.log($rootScope.actividadModificada.hora);



}

$scope.editarVenta=function()
{


  console.log("editandoVenta");

      $scope.ventaAModificar.idvendedor=$scope.sesion;       
      $scope.errorContacto="";
      $scope.errorProducto="";
      $scope.errorCantidad="";
      $scope.errorEtapa="";
      $scope.errorNombre="";
      $scope.errorStatus="";
      $scope.errorFecha="";
      $scope.errorDescuento="";

    //  $scope.prueba1="h2";


      var error=false;
      var encontrado=false;
      for (i = 0; i < $scope.contactos.length; i++) 
      { 
        
          if($scope.contactos[i].nombreContacto==$scope.ventaAModificar.contacto)
          {
                $scope.ventaAModificar.idcontacto=$scope.contactos[i].idContacto;  
                encontrado=true;
          }
      }
console.log(error);

      if(!encontrado)
      {
        error=true;
        $scope.errorContacto="El contacto no existe";
      }     

      console.log(error);
    
      encontrado=false; 
   
      console.log(error);
   
      if($scope.ventaAModificar.nombre==undefined){
        $scope.errorNombre="Ingresa un nombre para la venta";
        error=true;

      }else{        
        var str=$scope.ventaAModificar.nombre;
        if(str.length > 30){
          $scope.errorNombre="Ingresa un nombre más pequeño para la venta";
          error=true;
        }
      }
    
console.log(error);

      if($scope.ventaAModificar.contacto==undefined){
         $scope.errorContacto="Selecciona un contacto";
        error=true;
      }

      if($scope.ventaAModificar.etapa==undefined){
         $scope.errorEtapa="Selecciona una etapa";
        error=true;
      }

      $scope.ventaproductos=[];
      var cont=0;
      for(var i=0;i<$scope.productos.length;i++){
        if($scope.productos[i].isSelected){
          if($scope.productos[i].cantidad==undefined || $scope.productos[i].cantidad > 999999 || (!/^([0-9])*$/.test($scope.productos[i].cantidad)  )){
            error=true;
            $scope.errorProductos="Ingresa una cantidad válida";
          }else{
                    var r=$scope.productos[i].cantidadAnterior-$scope.productos[i].cantidad;
                    $scope.productos[i].existencias=parseInt($scope.productos[i].existencias) + parseInt(r);
                    $scope.ventaproductos[cont]=$scope.productos[i];
                    
                    cont++;
          }
        }

      }    
console.log(error);


      if($scope.ventaAModificar.status==undefined){
         $scope.errorStatus="Ingresa un status";
        error=true;
      }

       if($scope.ventaAModificar.descuento!=undefined){
        if($scope.ventaAModificar.descuento<0){
            $scope.errorDescuento="Ingresa un descuento positivo";
             error=true;
        }

         if (!/^([0-9])*$/.test($scope.ventaAModificar.descuento)){
            $scope.errorDescuento="Ingresa un descuento válido";
            error=true;
        }

       
      }




      

      /*
      if($scope.ventaAModificar.fechaCierre==undefined){
        $scope.errorFecha="Ingresa una fecha";
        error=true;
      }
*/
      console.log();



      if(typeof $scope.ventaAModificar.etapa === 'undefined'){
        $scope.errorEtapa="Selecciona una etapa";
        error=true;

      }
      console.log(error);

       //   $scope.ventas.push(obj);   
       if(!error)
       {
               $scope.ventaAModificar.total=0;
                for(var i=0;i<$scope.productos.length;i++){
               
                    if($scope.productos[i].isSelected==true){
                     
                      $scope.ventaAModificar.total=$scope.ventaAModificar.total+$scope.productos[i].precio * $scope.productos[i].cantidad;
                      console.log($scope.ventaAModificar.total);
                    }
                    
                }

            if($scope.configVentas.descuento==false)
              var desc=0;
            else
              var desc=$scope.ventaAModificar.total* $scope.ventaAModificar.descuento / 100;
            
            $scope.ventaAModificar.total=$scope.ventaAModificar.total-desc;
            console.log(desc);
            console.log($scope.ventaAModificar.descuento);
            console.log($scope.ventaAModificar.total);

            console.log($scope.ventaAModificar.id);
            console.log($scope.ventaAModificar.fechaCierre);


            $venta=$scope.ventaAModificar;
            $venta.productos=$scope.ventaproductos;
            console.log("tratando de actualizar");
            console.log($scope.ventaAModificar);

           $http.put('php/actualizarVenta.php', $venta).success(function(data){
           //  $scope.ventaAModificar = data;            
           console.log(data);

           });  


          console.log($scope.ventaAModificar);
          $rootScope.venta=$scope.ventaAModificar;
          console.log($rootScope.venta);          
          // $scope.ventaAModificar={};

          $("[data-dismiss=modal]").trigger({ type: "click" });
          alert("Venta Actualizada" );


     }
        

        // $scope.$parent.prueba1="pruebaaaa";
       //     location.reload();

     
}

$scope.pasarActividad=function(actividad){
  $scope.actividadABorrar=actividad;
}


  $scope.borrarActividad=function(actividad)
  {
    console.log("borrarActividad");
    $http.post("php/borrarActividad.php", {'id':$scope.actividadABorrar.id}).success(function(data,status,headers,config){
                console.log("Deleted Succesfully");
                alert("Actividad Borrada");

        var index = $scope.actividades.indexOf($scope.actividadABorrar);
        $scope.actividades.splice(index, 1);   

            })               
           // location.reload();        
  }

$scope.borrarVenta=function(){
console.log("borrando venta");
        $http.post("php/borrarVenta.php", {'id':$rootScope.venta.id}).success(function(data,status,headers,config){
                console.log(data);
               // alert("Venta Borrada");

                $state.go('main');

            })               


}








$scope.guardarActividad=function()
{/*
      var error=false;
      if (!/^([0-9])*$/.test(actividad.hora))
        error=true;
      if(!/^([0-9])*$/.test(actividad.duracion))
        error=true;
      if(actividad.hora<0 || actividad.hora>24)
        error=true;

*/
console.log("entrandoooo");
console.log($rootScope.actividadModificada);

console.log($rootScope.actividadModificada.hora);

      var error=false;
      $scope.errorHora="";
      $scope.errorDuracion="";
      $scope.errorTipo="";
      $scope.errorFecha="";
      $scope.errorStatus="";
      $scope.errorAnotaciones="";
  
//      $rootScope.actividadModificada.hora=$scope.hora;
       if (!/^([0-9])*$/.test($rootScope.actividadModificada.duracion))
      {
        $scope.errorDuracion="Ingresa un valor válido";
        error=true;
      }
  


      if($rootScope.actividadModificada.tipo==undefined){
        $scope.errorTipo="Selecciona un tipo de actividad";
        error=true;

      }
      if($rootScope.actividadModificada.fecha==undefined){
         $scope.errorFecha="Selecciona una fecha";
        error=true;
      }
      console.log($rootScope.actividadModificada.hora);
      if($rootScope.actividadModificada.hora==undefined){
         $scope.errorHora="Ingresa una hora";
        error=true;
      }

      if($rootScope.actividadModificada.duracion==undefined){
         $scope.errorDuracion="Ingresa la duración";
        error=true;
      }else{
          if($rootScope.actividadModificada.duracion>300){
            $scope.errorDuracion="Ingresa una duración menor";
            error=true;

          }

      }
      
      if($rootScope.actividadModificada.status==undefined){
         $scope.errorStatus="Ingresa un status";
        error=true;
      }     

      if($rootScope.actividadModificada.anotaciones!=undefined){

        var palabras = ($rootScope.actividadModificada.anotaciones).split(" ");

        for(var i=0;i<palabras.length;i++){

          if(palabras[i].length>30){
            error=true;
            $scope.errorAnotaciones="Ingresa una anotación correcta";
          }
        }

      }


      console.log("act");
      console.log($rootScope.actividadModificada);
      console.log($rootScope.actividadModificada.hora);

      console.log(error);
      if(!error){
/*
            var string  = $rootScope.actividadModificada.hora+"";
            var h = string.split(" ");
          //  var string2="";
          // var hora = new Date(h.slice(0,3).reverse().join('/')+' '+h[3]);
          console.log(h);
          var hora=h[4];
          hora=hora.substring(0, 5);
          console.log(hora);
          $rootScope.actividadModificada.hora=hora;

*/
        

           $http.put('php/actualizarActividad.php', $rootScope.actividadModificada).success(function(data){
               console.log(data);

               $rootScope.actividadActualizada.id=$rootScope.actividadModificada.id;
               $rootScope.actividadActualizada.tipo=$rootScope.actividadModificada.tipo;
               $rootScope.actividadActualizada.status=$rootScope.actividadModificada.status;
               $rootScope.actividadActualizada.fecha=$rootScope.actividadModificada.fecha;                 
               $rootScope.actividadActualizada.hora=$rootScope.actividadModificada.hora;
               $rootScope.actividadActualizada.duracion=$rootScope.actividadModificada.duracion;
               $rootScope.actividadActualizada.anotaciones=$rootScope.actividadModificada.anotaciones;


                console.log("Actualizado");
                console.log($rootScope.actividadActualizada);
              });  
           $("[data-dismiss=modal]").trigger({ type: "click" });
          alert("Actividad Actualizada " );



       }
}


$scope.agregarActividad=function()
{
    $scope.NuevaActividad.idventa=$rootScope.venta.id;
    $scope.NuevaActividad.status="No completada";
    var error=false;
    $scope.errorHora="";
    $scope.errorDuracion="";
    $scope.errorTipo="";
    $scope.errorFecha="";
    $scope.errorAnotaciones="";

       if (!/^([0-9])*$/.test($scope.NuevaActividad.duracion))
      {
        $scope.errorDuracion="Ingresa un valor válido";
        error=true;
      }  


      if($scope.NuevaActividad.tipo==undefined){
        $scope.errorTipo="Selecciona un tipo de actividad";
        error=true;

      }
      if($scope.NuevaActividad.fecha==undefined)
      {
         $scope.errorFecha="Selecciona una fecha";
        error=true;
      }else{
        console.log("comparando fechas");
          var today = new Date();
          var dd = today.getDate();
          var mm = today.getMonth()+1; 
          var yyyy = today.getFullYear();
          if(dd<10){
              dd='0'+dd
          } 
          if(mm<10){
              mm='0'+mm
          } 
            console.log(today);
            console.log($scope.NuevaActividad.fecha);
          var today= yyyy+'/'+mm+'/'+dd;
          if(Date.parse($scope.NuevaActividad.fecha) <= Date.parse(today)){
            error=true;
         
            $scope.errorFecha="Ingresa una fecha a futuro";
          }
      }

      if($scope.NuevaActividad.hora==undefined){
         $scope.errorHora="Ingresa una hora";
        error=true;
      }

      if($scope.NuevaActividad.duracion==undefined)
      {
         $scope.errorDuracion="Ingresa la duración";
        error=true;
      }else{
            if($scope.NuevaActividad.duracion>300){
            $scope.errorDuracion="Ingresa una duración menor";
            error=true;

          }

      }


      if($scope.NuevaActividad.anotaciones!=undefined){

        var palabras = ($scope.NuevaActividad.anotaciones).split(" ");

        for(var i=0;i<palabras.length;i++){

          if(palabras[i].length>30){
            error=true;
            $scope.errorAnotaciones="Ingresa una anotación correcta";
          }
        }

      }

      console.log($scope.NuevaActividad);


      if(!error)
      {


          console.log("tratando de insertar");
          console.log($scope.NuevaActividad.hora);
          var x=$scope.NuevaActividad.hora;
         // $scope.NuevaActividad.hora=x.toString();
         console.log($scope.NuevaActividad.hora);


       

          $http.post("php/insertarNuevaActividad.php", $scope.NuevaActividad).success(function(data,status,headers,config){
                console.log("Inserted Succesfully");
                console.log(data);


            var obj={
                    'idventa':$scope.NuevaActividad.idventa,
                    'status':$scope.NuevaActividad.status,
                    'tipo':$scope.NuevaActividad.tipo,
                    'fecha':$scope.NuevaActividad.fecha,
                    'hora':new Date($scope.NuevaActividad.hora),
                    'duracion':$scope.NuevaActividad.duracion,
                    'anotaciones':$scope.NuevaActividad.anotaciones
                    
                }


            console.log("Nueva Actividad");
            console.log(obj);
            $scope.actividades.push(obj);   
            console.log($scope.actividades);


               $("[data-dismiss=modal]").trigger({ type: "click" });
                alert("Actividad Insertada " );

                 $scope.NuevaActividad={};
           });

        }

}



/*
  $scope.agregarActividad=function()
  {
     // $scope.NuevaActividad.idventa=1;

    
     $scope.NuevaActividad.idventa=$rootScope.venta.id;
      $scope.NuevaActividad.status="No completada";
      var error=false;
      $scope.errorHora="";
      $scope.errorDuracion="";
      $scope.errorTipo="";
      $scope.errorFecha="";

   

       if (!/^([0-9])*$/.test($scope.NuevaActividad.duracion))
      {
        $scope.errorDuracion="Ingresa un valor válido";
        error=true;
      }  


      if($scope.NuevaActividad.tipo==undefined){
        $scope.errorTipo="Selecciona un tipo de actividad";
        error=true;

      }
      if($scope.NuevaActividad.fecha==undefined)
      {
         $scope.errorFecha="Selecciona una fecha";
        error=true;
      }

      if($scope.NuevaActividad.hora==undefined){
         $scope.errorHora="Ingresa una hora";
        error=true;
      }

      if($scope.NuevaActividad.duracion==undefined){
         $scope.errorDuracion="Ingresa la duración";
        error=true;
      }else{
            if($scope.NuevaActividad.duracion>300){
            $scope.errorDuracion="Ingresa una duración menor";
            error=true;

          }

      }
                console.log($scope.NuevaActividad);



      if(!error)
      {

          console.log("tratando de insertar");
          console.log($scope.NuevaActividad);        


          console.log("tratando de insertar");
          $http.post("insertarNuevaActividad.php", $scope.NuevaActividad).success(function(data,status,headers,config){
                console.log("Inserted Succesfully");
                console.log(data);



            var obj={
                    'idventa':$scope.NuevaActividad.idventa,
                    'status':$scope.NuevaActividad.status,
                    'tipo':$scope.NuevaActividad.tipo,
                    'fecha':$scope.NuevaActividad.fecha,
                    'hora':$scope.NuevaActividad.hora,
                    'duracion':$scope.NuevaActividad.duracion,
                    'anotaciones':$scope.NuevaActividad.anotaciones
                    
                }


            console.log("Nueva Actividad");
            console.log(obj);
            $scope.actividades.push($scope.NuevaActividad);   
            console.log($scope.actividades);



            });
         
               $("[data-dismiss=modal]").trigger({ type: "click" });
          alert("Actividad Insertada " );
   



/*

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
          //para incluir en notificaciones

          if($scope.NuevaActividad.fecha==today){
            $rootScope.push($scope.NuevaActividad);
          }
          */


/*

            $scope.NuevaActividad={};
          }
          else
          {
            console.log("something is wrong");

          }






  }

*/

}]);

