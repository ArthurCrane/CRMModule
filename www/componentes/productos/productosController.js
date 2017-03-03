
(function() {

    angular.module('app').controller('productosController', productosController);

    productosController.$inject = ['$scope','$rootScope','grupoService','productosService','configuracionService','validationService','$http','$state','perfilService'];

    /* @ngInject */
    function productosController($scope,$rootScope,grupoService,productosService,configuracionService,validationService,$http,$state,perfilService) {
    	$scope.productos=[];  
    	$scope.configProductos=[];
    	$scope.NuevoProducto={};
    	$scope.NuevoProducto.existencias=0;
    	$scope.NuevoProducto.propiedades="";
    	$scope.NuevoProducto.descripcion=""; 
    	$scope.NuevoProducto.imagen="http://localhost/angular/template/server/php/files/defaultproduct.jpg"; 
    	$rootScope.productoAModificar={};
    	$rootScope.productoAModificar.existencias=0;
    	$rootScope.productoAModificar.propiedades="";
    	$rootScope.productoAModificar.descripcion="";
    	$scope.errores="";

		activate();
		$scope.addProducto=addProducto;
		$scope.deleteProducto=deleteProducto;
		$scope.updateProducto=updateProducto;
		$scope.setProductoAModificar=setProductoAModificar;
		$scope.setProductoABorrar=setProductoABorrar;


		function activate(){	
			console.log("productos");
			checarSesion();
			getProductos();									
		}		


	$scope.MyFiles=[];

$scope.handler=function(e,files)
{
	console.log("handllllllllllllllerrr");
    var reader=new FileReader();
    reader.onload=function(e)
    {
        var string=reader.result;
        var object=$filter('csvToObj')(string);
        //do what you want with obj !   
        	console.log(object);

        	for(var i=0;i<object.length-1;i++){
        		console.log(object[i]);
        		object[i].imagen="";
        		object[i].anotaciones="";
        		var obj=object[i];


        		 console.log("tratando de insertar");
			          $http.post("php/insertarContacto.php", object[i]).success(function(data,status,headers,config){
			                console.log("Inserted Succesfully");
			                console.log(data[0]);
			                if(data[0]=="error"){
				                	console.log("ERRRRRRRRRRRRROOOOOOOOOR");
				                	//alert("Error con alguno de los contactos");

			                }else{								
								$scope.contactos.push(data[0]);	
								console.log($scope.contactos);

			                }
			                //var obj=$scope.NuevoContacto;
			                

			            });


        	}

			               // $scope.NuevoContacto={};
			                alert("Tabla Actualizada");

    }
    reader.readAsText(files[0]);

}



$scope.archivo={};







    	function checarSesion(){
    		 $http.get("php/checarSesion.php").success(function(data){
					  $scope.sesion=data;
					  console.log("sesion");
					  console.log($scope.sesion);
					  if($scope.sesion=="false"){					
						   $state.go('login');
					  }else{
					  	$rootScope.user=$scope.sesion;
					  	console.log($rootScope.user);

					  	perfilService.getUsuario($rootScope.user)
							.then(function(data){
								$rootScope.tipoUsuario= data[0].tipo;	
								console.log($rootScope.tipoUsuario);				
							}, function(data){
										console.log("Error:"+data);		
							})

					  	getConfigurationData();
					  }
					});

    	};

			$(function () {
			       $('#fileupload').fileupload({
			        dataType: 'json',
			        done: function (e, data) 
				        {
				            $.each(data.result.files, function (index, file) 
				            {
				                $('<p/>').text(file.name).appendTo(document.body);
				                console.log(file);
				                console.log(file.url);
				                $scope.NuevoProducto.imagen=file.url;
				                console.log($scope.NuevoProducto.imagen);
				            });
				        }
			   		 });
				});

				$(function () {
				       $('#fileupload2').fileupload({
					    dataType: 'json',
					    done: function (e, data) 
					        {
					            $.each(data.result.files, function (index, file) 
					            {
					               // $('<p/>').text(file.name).appendTo(document.body);
					                console.log(file);
					                console.log(file.url);
					                $rootScope.productoAModificar.imagen=file.url;
					                console.log($rootScope.productoAModificar.imagen);
					            });
					        }
					    });
				});




		function getConfigurationData(){
			console.log("configuracion");
			configuracionService.getConfiguracionProductos($rootScope.user)
				.then(function(data){
					$scope.configProductos= data[0];	
					console.log($scope.configProductos);			
				}, function(data){
							console.log("Error:"+data[0]);		
				})


		};

		function getProductos(){

			productosService.getProductos()
					.then(function(data){
						$scope.productos= data;	
						console.log($scope.productos);				
					}, function(data){
								console.log("Error:"+data);		
					})


		};


	

		function addProducto(){
			$scope.errores="";
			var data=validationService.validateProducto($scope.NuevoProducto,$scope.productos);
			$scope.errores=data;
			console.log("adding");
			console.log(data);
			console.log(data.length);
			if(data.errorNombre!=undefined||data.errorPrecio!=undefined||data.errorPropiedades!=undefined||data.errorDescripcion!=undefined||data.errorExistencias!=undefined){
				console.log("error");
				$scope.errorNombre=data.errorNombre;
				$scope.errorPrecio=data.errorPrecio;
				$scope.errorPropiedades=data.errorPropiedades;

			}else{
				console.log("no error");				
				console.log($scope.NuevoProducto);
				productosService.insertProducto($scope.NuevoProducto)
						.then(function(data){
							toastr.success("Producto Agregado Correctamente!");
		              		$scope.productos.push(data[0]);
		                	console.log($scope.productos);
		                	$scope.NuevoProducto={};
		                	$scope.NuevoProducto.existencias=0;
					    	$scope.NuevoProducto.propiedades="";
					    	$scope.NuevoProducto.descripcion=""; 
					    	$scope.NuevoProducto.imagen="http://localhost/angular/template/server/php/files/defaultproduct.jpg"; 
	       		            $("[data-dismiss=modal]").trigger({ type: "click" });
							console.log(data);	
					    	$scope.errores="";
			
						}, function(data){
								console.log("Error:"+data);		
								toastr.warning("Error al agregar Producto");
						})

			}
		

		};

		function deleteProducto(){
			console.log("deleting");
			productosService.deleteProducto($scope.productoABorrar.idProducto)
					.then(function(data){
						var index = $scope.productos.indexOf($scope.productoABorrar);
						$scope.productos.splice(index, 1);   
						console.log("nuevos productos");
						console.log($scope.productos);	
						console.log(data);			
						toastr.success("Producto Borrado Correctamente!");
	
					}, function(data){
								console.log("Error:"+data);		
								toastr.warning("Error al Borrar Producto");

					})


		};

		function updateProducto(producto){
	    	$scope.errores="";

			console.log("updating");
			console.log($scope.productoAModificar);


			var data=validationService.validateProducto($scope.productoAModificar,$scope.productos);
			$scope.errores=data;
			console.log("adding");
			console.log(data);
			console.log(data.length);
			if(data.errorNombre!=undefined||data.errorPrecio!=undefined||data.errorPropiedades!=undefined||data.errorDescripcion!=undefined){
				console.log("error");
				$scope.errorNombre=data.errorNombre;
				$scope.errorPrecio=data.errorPrecio;
				$scope.errorPropiedades=data.errorPropiedades;
			}else{
				console.log("no error");

				productosService.updateProducto($scope.productoAModificar)
								.then(function(data){
					            $rootScope.productoActualizado.nombreProducto=$rootScope.productoAModificar.nombreProducto;
					            $rootScope.productoActualizado.precio=$rootScope.productoAModificar.precio;
					            $rootScope.productoActualizado.descripcion=$rootScope.productoAModificar.descripcion;			
					        	$rootScope.productoActualizado.propiedades=$rootScope.productoAModificar.propiedades;          
               					$rootScope.productoActualizado.imagen=$rootScope.productoAModificar.imagen;
               					$rootScope.productoActualizado.existencias=$rootScope.productoAModificar.existencias;
					             
					           	$("[data-dismiss=modal]").trigger({ type: "click" });
					           	toastr.success("Producto Actualizado Correctamente!");
					           	$scope.errores="";



								}, function(data){
											console.log("Error:"+data);		
											toastr.warning("Error al Actualizar Producto");

								})

			}

		
		}

		function setProductoAModificar(producto){
			$scope.errores="";

			var producto=producto;
			$rootScope.productoAModificar.idProducto=producto.idProducto;
	 		$rootScope.productoAModificar.nombreProducto=producto.nombreProducto;
	 		$rootScope.productoAModificar.precio=producto.precio;
	 		$rootScope.productoAModificar.descripcion=producto.descripcion;
	 		$rootScope.productoAModificar.propiedades=producto.propiedades;		
	 		$rootScope.productoAModificar.imagen=producto.imagen;   
	 		$rootScope.productoAModificar.existencias=producto.existencias;            

			$scope.errorNombre="";
		  	$scope.errorPrecio="";
		  	$scope.errorDescripcion="";
		  	$rootScope.productoActualizado=producto;
		  	console.log("stting");
		  	console.log($scope.productoAModificar);		

		}

		function setProductoABorrar(producto){
	   	  $scope.productoABorrar=producto;
	   	  console.log("borrar");
	   	  console.log($scope.productoABorrar.idProducto);


   		}



    }
    	
})();