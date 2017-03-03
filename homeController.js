(function(){
  angular.module('app').controller('homeController',homeController);
  homeController.$inject=['$scope','$timeout','$http','$state','$rootScope','perfilService'];

  function homeController($scope,$timeout,$http,$state,$rootScope,perfilService){
      $scope.productos=[];
      $scope.idvendedor="";
      $scope.NuevoNegocio={};
      $scope.agregarVenta=agregarVenta;
      $scope.seleccionarTodos=seleccionarTodos;
      $scope.checkTodos=false;
      $scope.totalProductos=0;


      activate();

      function activate(){

        checarSesion();
        

      };

      function checarSesion(){
        //   $scope.ventas2=[];
          $http.get("php/checarSesion.php").success(function(data){
              $scope.sesion=data;              
              console.log("sesion");
              console.log($scope.sesion);
              if($scope.sesion=="false")
              {
                 //  $("contenidoAmostrar").hide();
                  document.getElementById('contenidoAmostrar1').style.display = 'none';
                  console.log("falsse");
                 $state.go('login');
              }
              else
              {
                console.log(" si hay sesion ventas");
                document.getElementById('contenidoAmostrar1').style.display = 'block';
                console.log("truee");
                console.log($scope.sesion);
                $rootScope.user=$scope.sesion;
                //se llena el arreglo de ventas para incluir en el ciclo de ventas
                getVentas();
                getContactos();
                getProductos();
               }

            }).error(function(){
              alert("an unexpected error ocurred")
            });


      };

      function getVentas(){        
          $scope.totalIdea=0;
          $scope.totalContacto=0;
          $scope.totalNecesidad=0;
          $scope.totalPropuesta=0;
          $scope.totalNegociacion=0;

                  $scope.ventas=[];
                  console.log($scope.sesion);
                  $scope.idvendedor=$scope.sesion;
                  $http.post("php/getVentasPosibles.php",$rootScope.user).success(function(data){
                  $scope.ventas=data;
                  console.log($scope.ventas);
                  for(i=0;i<$scope.ventas.length;i++){
                    if($scope.ventas[i].etapa=='Idea')
                      $scope.totalIdea=$scope.totalIdea+parseInt($scope.ventas[i].total);
                     if($scope.ventas[i].etapa=='Contacto Establecido')
                      $scope.totalContacto=$scope.totalContacto+parseInt($scope.ventas[i].total);
                     if($scope.ventas[i].etapa=='Necesidad Descubierta')
                      $scope.totalNecesidad=$scope.totalNecesidad+parseInt($scope.ventas[i].total);
                     if($scope.ventas[i].etapa=='Propuesta Presentada')
                      $scope.totalPropuesta=$scope.totalPropuesta+parseInt($scope.ventas[i].total);
                     if($scope.ventas[i].etapa=='Negociación')
                      $scope.totalNegociacion=$scope.totalNegociacion+parseInt($scope.ventas[i].total);
                  }
                  console.log("ventas");
                  console.log(data);
                    }).error(function(){
                      alert("an unexpected error ocurred")
                    });

      };
      function getContactos(){
      //se llena el arreglo de contactos para incluir en el select
          $scope.contactos=[];
          $http.put("php/contactos.php",{idvendedor:$rootScope.user}).success(function(data){
            $scope.contactos=data;
          
            }).error(function(){
              alert("an unexpected error ocurred")
            });

      };

      function getProductos(){
        //se llena el arreglo de productos para incluir en el select
          $scope.productos=[];
          $http.get("php/productos.php").success(function(data){
            $scope.productos=data;
            console.log($scope.productos);

            for(var i=0;i< $scope.productos.length;i++){
              console.log($scope.productos[i]);
              $scope.productos[i].isSelected=false;
            }

          }).error(function(){
              alert("an unexpected error ocurred")
          });
      };

      function seleccionarTodos(){
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


      function agregarVenta(){
      console.log("CONTACTOS:");
      $scope.NuevoNegocio.idvendedor=$rootScope.user;   
      $scope.NuevoNegocio.status="En proceso";
      $scope.errorNombre="";
      $scope.errorContacto="";
      $scope.errorProductos="";
      $scope.errorCantidad="";
      $scope.errorEtapa="";

      var error=false;
      var encontrado=false;
        
      for (i = 0; i < $scope.ventas.length; i++) 
      {         
        if($scope.ventas[i].nombre==$scope.NuevoNegocio.nombre)
          {
          //  $scope.NuevoNegocio.idproducto=$scope.productos[i].idProducto;
            $scope.errorNombre="Ingresa otro nombre para la venta que no se repita"
            encontrado=true;
            error=true;
          }         
      }

      $scope.ventaproductos=[];
      var cont=0;
      for(var i=0;i<$scope.productos.length;i++){
        if($scope.productos[i].isSelected){
          if($scope.productos[i].cantidad==undefined || $scope.productos[i].cantidad > 999999 || (!/^([0-9])*$/.test($scope.productos[i].cantidad)  )){
            error=true;
            $scope.errorProductos="Ingresa una cantidad válida";
          }else{
                    $scope.ventaproductos[cont]=$scope.productos[i];
                    cont++;
          }
        }

      }    
      console.log($scope.ventaproductos);

      if($scope.NuevoNegocio.nombre==undefined){
        $scope.errorNombre="Ingresa un nombre para la venta";
        error=true;

      }else{

      var str=$scope.NuevoNegocio.nombre;
      if(str.length > 30){
        $scope.errorNombre="Ingresa un nombre más pequeño para la venta";
        error=true;
      }


      }



      if($scope.NuevoNegocio.contacto==undefined){
         $scope.errorContacto="Selecciona un contacto";
        error=true;
      }

      if($scope.NuevoNegocio.etapa==undefined){
         $scope.errorEtapa="Selecciona una etapa";
        error=true;
      }

     

      console.log("etapa?");
      console.log($scope.NuevoNegocio.etapa);
      console.log("etapa?");


     
      console.log(error);
      if(!error)
      {


                
              for (i = 0; i < $scope.contactos.length; i++) 
                          {         
                            if($scope.contactos[i].nombreContacto==$scope.NuevoNegocio.contacto)
                              {
                                console.log("encontró el contacto");
                                $scope.NuevoNegocio.idcontacto=$scope.contactos[i].idContacto;
                               
                              }         
              }
                

              console.log($scope.NuevoNegocio.contacto);
          $scope.NuevoNegocio.total=0;
            for(var i=0;i<$scope.productos.length;i++)
          {
           
            if($scope.productos[i].isSelected==true)  {
             console.log($scope.productos[i]);
              $scope.NuevoNegocio.total=$scope.NuevoNegocio.total+$scope.productos[i].precio * $scope.productos[i].cantidad;
              console.log($scope.NuevoNegocio.total);
            }
            
          }

          console.log($scope.productos);

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
          $scope.NuevoNegocio.fechaRegistro=today;
          console.log($scope.NuevoNegocio.fechaRegistro);
           var obj={
          'nombre':$scope.NuevoNegocio.nombre,
          'etapa':$scope.NuevoNegocio.etapa,
          'contacto':$scope.NuevoNegocio.contacto,
          'total':$scope.NuevoNegocio.total
      }

          $scope.ventas.push(obj);   
          console.log("tratando de insertar");
          console.log($scope.NuevoNegocio);
        
          $http.post("php/insertarNuevoNegocio.php", {'idvendedor':$scope.NuevoNegocio.idvendedor,
            'idcontacto': $scope.NuevoNegocio.idcontacto, 'productos': $scope.ventaproductos,
            'nombre': $scope.NuevoNegocio.nombre, 'cantidad':$scope.NuevoNegocio.cantidad,
            'etapa':$scope.NuevoNegocio.etapa, 'total':$scope.NuevoNegocio.total,'status':$scope.NuevoNegocio.status,'fechaRegistro':$scope.NuevoNegocio.fechaRegistro}).success(function(data,status,headers,config){
                console.log("Inserted Succesfully");
            })
          $scope.NuevoNegocio={};
          $scope.errorCantidad="";
          $scope.errorProducto="";
          $scope.errorContacto="";
          $scope.errorNombre="";
          $scope.errorEtapa="";
          $("[data-dismiss=modal]").trigger({ type: "click" });

          $('#modalNuevoNegocio').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();

          alert("Venta Registrada" );



      }
      else
      {

        console.log("SOMETHING IS WRONG");
      }


      };



  }

})();
