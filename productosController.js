
app.controller('productosController', function($scope,$timeout,$http,$rootScope){

	$scope.productos=[];
	$rootScope.productoAModificar={};
	$rootScope.productoActualizado={};


 	$http.get("php/productos.php").success(function(data){
    $scope.productos=data;
    console.log("productos");
    console.log(data);
    $scope.NuevoProducto={};


/*
   $scope.filteredTodos = [], 
   $scope.currentPage = 2,
   $scope.numPerPage = 2,
   $scope.maxSize = 5;
   $scope.todos = $scope.productos;
    console.log($scope.todos);

  $scope.$watch('currentPage + numPerPage', function() {
    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
    , end = begin + $scope.numPerPage;
    
    $scope.filteredTodos = $scope.todos.slice(begin, end);

  });


*/


  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function() {
    $log.log('Page changed to: ' + $scope.currentPage);
  };

  $scope.maxSize = 10;
  $scope.bigTotalItems = 175;
  $scope.bigCurrentPage = 1;





  

  }).error(function(){
      alert("an unexpected error ocurred")
  });

   


//   $scope.ventas2=[];
  $http.get("php/checarSesion.php").success(function(data){
  $scope.sesion=data;
  console.log("sesion");
  console.log($scope.sesion);

  if($scope.sesion=="false"){
   //  $("contenidoAmostrar").hide();
    document.getElementById('contenidoProductos').style.display = 'none';

    console.log("falsse");
   $state.go('login');

  }else{
    document.getElementById('contenidoProductos').style.display = 'block';

    console.log("truee");
  }


    }).error(function(){
      alert("an unexpected error ocurred")
    });



  $http.get("php/getVentas.php").success(function(data){
    $scope.ventas=data;
    console.log("ventas");
    console.log(data);
   
  }).error(function(){
      alert("an unexpected error ocurred")
  });




  $scope.agregarProducto=function()
  {
  	console.log("agregando producto");
	  	$scope.errorNombre="";
	  	$scope.errorPrecio="";
	  	$scope.errorDescripcion="";
		var error=false;


      for (i = 0; i < $scope.productos.length; i++) 
      {         
        if($scope.productos[i].nombreProducto==$scope.NuevoProducto.nombreProducto)
          {
          //  $scope.NuevoNegocio.idproducto=$scope.productos[i].idProducto;
            $scope.errorNombre="Ingresa otro nombre para el producto que no se repita"
            error=true;
          }         
      } 

	    if($scope.NuevoProducto.nombreProducto==undefined){
	        $scope.errorNombre="Ingresa un nombre";
	        error=true;

	    }else{
	    	if($scope.NuevoProducto.nombreProducto.length>30){
	    		$scope.errorPrecio="Ingresa un nombre con menos caracteres";
	    		error=true;
	    	}


	    }
	    if($scope.NuevoProducto.precio==undefined){
	         $scope.errorPrecio="Ingresa un precio";
	        error=true;
	    }else{
	    	if($scope.NuevoProducto.precio.length>7){
	    		$scope.errorNombre="Ingresa un precio válido con longitud de 7 caracteres";
	    		error=true;
	    	}

	    }

	    if($scope.NuevoProducto.descripcion==undefined){
	         $scope.errorDescripcion="Ingresa una descripcion";
	        error=true;
	    }else{
	    	if($scope.NuevoProducto.descripcion.length>300){
	    		$scope.errorNombre="Ingresa una descripcion más corta";
	    		error=true;
	    	}
	    }

	    if (!/^([0-9])*$/.test($scope.NuevoProducto.precio)){
	    	$scope.errorPrecio="Ingresa un dato válido";
	    	error=true;
		}



		console.log(error);
		if(!error)
		{
	          console.log("tratando de insertar");
	          $http.post("php/insertarProducto.php", $scope.NuevoProducto).success(function(data,status,headers,config){
	                console.log("Inserted Succesfully");
	                console.log(data);

	          //     $scope.NuevoProducto=data;

	           
	          		$scope.NuevoProducto.idProducto=data[0].idProducto;
	                $scope.NuevoProducto.nombreProducto=data[0].nombreProducto;
	                $scope.NuevoProducto.precio=data[0].precio;
	                $scope.NuevoProducto.descripcion=data[0].descripcion;


	              //  var obj=data;
	                console.log($scope.NuevoProducto);
	                $scope.productos.push($scope.NuevoProducto);
	                console.log($scope.productos);

	                $scope.NuevoProducto={};
	                $("[data-dismiss=modal]").trigger({ type: "click" });
	                alert("Producto Insertado");
	                //location.reload();    

	            });
		}
   }

   $scope.setProductoABorrar=function(producto){
   	  $scope.productoABorrar=producto;
   	  console.log("borrar");
   	  console.log($scope.productoABorrar.idProducto);


   }

	$scope.editarProducto=function(producto){
		var producto=producto;
		$rootScope.productoAModificar.idProducto=producto.idProducto;
 		$rootScope.productoAModificar.nombreProducto=producto.nombreProducto;
 		$rootScope.productoAModificar.precio=producto.precio;
 		$rootScope.productoAModificar.descripcion=producto.descripcion;
		$scope.errorNombre="";
	  	$scope.errorPrecio="";
	  	$scope.errorDescripcion="";
	  	$rootScope.productoActualizado=producto;


}

$scope.borrarMensajes=function(){


	$scope.errorNombre="";
	$scope.errorPrecio="";
  	$scope.errorDescripcion="";

}
$scope.guardarProducto=function(){
	var error=false;
	

	$scope.errorNombre="";
	$scope.errorPrecio="";
  	$scope.errorDescripcion="";
	var error=false;
/*
   for (i = 0; i < $scope.productos.length; i++) 
      {         
        if($scope.productos[i].nombreProducto==$scope.productoAModificar.nombreProducto)
          {
          //  $scope.NuevoNegocio.idproducto=$scope.productos[i].idProducto;
            $scope.errorNombre="Ingresa otro nombre para el producto que no se repita"
            error=true;
          }         
      }
    
 if($rootScope.productoAModificar.nombreProducto==undefined){
	        $scope.errorNombre="Ingresa un nombre";
	        error=true;
	    }else{
	    	if($scope.NuevoProducto.nombreProducto.length>30){
	    		$scope.errorNombre="Ingresa un nombre con menos caracteres";
	    		error=true;
	    	}

	    }

	    */
	    if($rootScope.productoAModificar.precio==undefined){
	         $scope.errorPrecio="Ingresa un precio";
	        error=true;
	    }else{
	    		if($scope.productoAModificar.precio>999999){
	    		$scope.errorPrecio="Ingresa un precio válido con longitud de 7 caracteres";
	    		error=true;
	    	}
	    }
	  //  console.log($rootScope.productoAModificar.descripcion);

	      if($rootScope.productoAModificar.descripcion==undefined || $rootScope.productoAModificar.descripcion==""){
	         $scope.errorDescripcion="Ingresa una descripcion";
	        error=true;
	    }else{
	    		if($scope.productoAModificar.descripcion.length>500){
	    		$scope.errorDescripcion="Ingresa una descripcion más corta";
	    		error=true;
	    	}
	    }


	    if (!/^([0-9])*$/.test($rootScope.productoAModificar.precio)){
	    	error=true;
	    	$scope.errorPrecio="Ingresa un precio válido";
			}
	  console.log(error);
	  console.log($rootScope.productoAModificar);
      if(!error){

           $http.put('php/actualizarProducto.php', $rootScope.productoAModificar).success(function(data){
               console.log(data);
               	  //	$rootScope.productoActualizado.nombreProducto="a";

             $rootScope.productoActualizado.nombreProducto=$rootScope.productoAModificar.nombreProducto;
               $rootScope.productoActualizado.precio=$rootScope.productoAModificar.precio;
             $rootScope.productoActualizado.descripcion=$rootScope.productoAModificar.descripcion;


                 console.log($rootScope.productoActualizado);

                console.log("Actualizado");
              });  
           $("[data-dismiss=modal]").trigger({ type: "click" });
          alert("Producto Actualizado " );



       }


}



   $scope.borrarProducto=function(producto)
   {
   	var error=false;
    console.log("borrar Producto");
    console.log($scope.productoABorrar.idProducto);

		//Verificar si el producto esta ligado a alguna venta, en ese caso no se puede borrar


	for(var i=0;i<$scope.ventas.length;i++)
  {
  	console.log($scope.ventas[i],producto);
  	console.log($scope.productoABorrar.nombreProducto);
			if($scope.ventas[i].producto==$scope.productoABorrar.nombreProducto){
	    		error=true;
	    	}

	}
	console.log(error);


	    if(!error){    	
		    $http.post("php/borrarProducto.php", {'idProducto':$scope.productoABorrar.idProducto}).success(function(data,status,headers,config){
		                console.log("Deleted Succesfully")
		                console.log(data);
		                alert("Producto Borrado");
		            })               

				var index = $scope.productos.indexOf($scope.productoABorrar);
				$scope.productos.splice(index, 1);   
				console.log("nuevos productos");
				console.log($scope.productos);


		         //   location.reload();    
		    }else{
		    	alert("El producto no se puede borrar, tiene ventas asignadas");
		    }


   }









});
