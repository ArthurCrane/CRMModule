(function() {

    angular.module('app').controller('perfilController', perfilController);

    perfilController.$inject=['$scope','$rootScope','perfilService','$http','$state','configuracionService'];

    function perfilController($scope,$rootScope,perfilService,$http,$state,configuracionService){
    	activate();
    	$scope.actualizarUsuario=actualizarUsuario;
    	$scope.cambiarContrasenia=cambiarContrasenia;


    	function activate(){
    		checarSesion();


			$(function () {
			       $('#fileupload').fileupload({
			        dataType: 'json',
			        done: function (e, data) 
				        {
				            $.each(data.result.files, function (index, file) 
				            {
				                console.log(file);
				                console.log(file.url);
				                $scope.usuario.imagen=file.url;

				                perfilService.actualizarImagen($rootScope.user,$scope.usuario.imagen)
										.then(function(data){										
											console.log(data);	
											getUsuario();
											toastr.success("Imagen Guardada");

										}, function(data){
											console.log("Error:"+data);		
										})
				            });
				        }
			   		 });
				});



    		

    	};

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

							getUsuario();
							getConfigurationData();

					  }
					});

    	};


		function getConfigurationData(){
			console.log("configuracion");
			configuracionService.getConfiguracionUsuario($rootScope.user)
				.then(function(data){
					$scope.configUsuario= data[0];	
					console.log($scope.configUsuario);		

					if($scope.configUsuario.imagen)
					        document.getElementById('contenidoImagen').style.display = 'block';
					    else
					    	 document.getElementById('contenidoImagen').style.display = 'none';

	
				}, function(data){
							console.log("Error:"+data[0]);		
				})


		};





    	function getUsuario(){
    			perfilService.getUsuario($rootScope.user)
					.then(function(data){
						$scope.usuario= data  [0];	
						var fecha=new Date($scope.usuario.fechaNacimiento);
						$scope.usuario.fechaNacimiento=fecha;
						console.log($scope.usuario);				
					}, function(data){
								console.log("Error:"+data);		
					})



    	};
    	function actualizarUsuario(){
    		console.log("Actualizando usuario");
    		var error=false;
    		$scope.errorNombre="";
    		$scope.errorCorreo="";
    		$scope.errorFechaNacimiento="";

    		if($scope.usuario.nombre==undefined){
    			error=true;
    			$scope.errorNombre="Ingresa un nombre";
    		}

    		if($scope.usuario.fechaNacimiento==undefined){
    			error=true;
    			$scope.errorFechaNacimiento="Ingresa una fecha de Nacimiento";
    		}

    		if($scope.usuario.mail==undefined){
    			error=true;
    			$scope.errorCorreo="Ingresa un correo";
    		}

    		if(!error){
    			//actualizar
					perfilService.actualizarUsuario($scope.usuario)
										.then(function(data){
										//	$rootScope.usuario= data[0];
										toastr.success("Perfil Actualizado Correctamente!");
	
										getUsuario();

										}, function(data){
													console.log("Error:"+data);		
										})



    		}


    	};
    	function cambiarContrasenia(){
    		console.log("cambiando password");
    		var error=false;
    		$scope.errorContrasenia="";

    		if($scope.contraConfirmacion==undefined) {
    			error=true;
    			$scope.errorContrasenia="Te falta introducir un campo";
    		}
    		if($scope.contraNueva==undefined) {

    			error=true;
    			    			$scope.errorContrasenia="Te falta introducir un campo";
    		}

    		if(!error){  
    			console.log("cambiando contraseña");
	    		if($scope.contraNueva==$scope.contraConfirmacion){
	    			console.log("se ha cambiado");
	    				perfilService.cambiarContrasenia($rootScope.user,$scope.contraNueva)
											.then(function(data){
											toastr.success("Contraseña Actualizada Correctamente!");		
											$scope.contraConfirmacion="";
											$scope.contraNueva="";

											}, function(data){
														console.log("Error:"+data);		
											})

	    		}else{
	    			console.log("no coinciden contraseñas");
	    			$scope.errorContrasenia="Las contraseñas no coinciden";
	    		}

			}
    	};



    }


})();