(function() {

    angular.module('app').controller('configuracionController', configuracionController);

    configuracionController.$inject = ['$scope','configuracionService','$rootScope','$http','$state','perfilService'];

    /* @ngInject */
    function configuracionController($scope,configuracionService,$rootScope,$http,$$state,perfilService) {
    	$scope.configProductos={};   
    	$scope.configClientes={};
    	$scope.configVentas={};


		activate();
		$scope.configurarProductos=configurarProductos;
		$scope.configurarClientes=configurarClientes;
		$scope.configurarVenta=configurarVenta;
		$scope.configurarUsuario=configurarUsuario;

		function activate(){	
			checarSesion();		
		
						
		}			

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

					  			getDatosConfigProductos();
								getDatosConfigClientes();
								getDatosConfigVenta();
								getDatosConfigUsuario();
					  }
					});

    	};



		/* En este metodo se llama al servicio que tomará los datos de configuracion de clientes */
		function getDatosConfigClientes(){		

				configuracionService.getConfiguracionClientes($rootScope.user)
					.then(function(data){
						$scope.configClientes= data[0];	
						console.log($scope.configClientes);				
					}, function(data){
								console.log("Error:"+data[0]);		
					})


			};

		/* En este metodo se manda llamar al servicio que guardará la información de clientes en la BD*/
		function configurarClientes(){
			$scope.configClientes.idusuario=$rootScope.user;
			console.log("Clientes");
			console.log($scope.configClientes);
			configuracionService.setConfiguracionClientes($scope.configClientes)
				.then(function(data){
					toastr.success("Configuración Guardada con Éxito");
					toastr.clear();
				}, function(data){
					console.log("Error:"+data);		
					toastr.error("Error guardando configuración");
					toastr.clear();

				})


		};



		function getDatosConfigProductos(){		
			configuracionService.getConfiguracionProductos($rootScope.user)
				.then(function(data){
					$scope.configProductos= data[0];

				
				}, function(data){
							console.log("Error:"+data[0]);		
				})




		};

		function configurarProductos(){
			$scope.configProductos.idusuario=$rootScope.user;
			console.log("Productos");
			console.log($scope.configProductos);
			configuracionService.setConfiguracionProductos($scope.configProductos)
				.then(function(data){
					//$scope.notificationsList= data || [];
					toastr.success("Configuración Guardada con Éxito");
					toastr.clear();
				}, function(data){
					console.log("Error:"+data);	
					toastr.error("Error guardando configuración");
					toastr.clear();	
				})

		};

		function getDatosConfigVenta(){
			configuracionService.getConfiguracionVenta($rootScope.user)
							.then(function(data){
								$scope.configVentas= data[0];

							
							}, function(data){
										console.log("Error:"+data[0]);		
							})


		};

		function configurarVenta(){
			$scope.configVentas.idusuario=$rootScope.user;
				console.log("Productos");
				console.log($scope.configVentas);
				configuracionService.setConfiguracionVenta($scope.configVentas)
					.then(function(data){
						toastr.success("Configuración Guardada con Éxito");
						toastr.clear();
					}, function(data){
						console.log("Error:"+data);	
						toastr.error("Error guardando configuración");
						toastr.clear();	
					})

		};

		function getDatosConfigUsuario(){		

				configuracionService.getConfiguracionUsuario($rootScope.user)
					.then(function(data){
						$scope.configUsuario= data[0];	
						console.log($scope.configUsuario);				
					}, function(data){
						console.log("Error:"+data[0]);		
					})


			};

		/* En este metodo se manda llamar al servicio que guardará la información de clientes en la BD*/
		function configurarUsuario(){
			$scope.configUsuario.idusuario=$rootScope.user;
			console.log("Clientes");
			console.log($scope.configUsuario);
			configuracionService.setConfiguracionUsuario($scope.configUsuario)
				.then(function(data){
					toastr.success("Configuración Guardada con Éxito");
					toastr.clear();
				}, function(data){
					console.log("Error:"+data);		
					toastr.error("Error guardando configuración");
					toastr.clear();

				})


		};


    }
    	
})();