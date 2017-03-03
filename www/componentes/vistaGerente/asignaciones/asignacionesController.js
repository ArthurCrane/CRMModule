(function(){
	angular.module('app').controller('asignacionesController',asignacionesController);
	asignacionesController.$inject=['$scope','$rootScope','asignacionesService','$http','$state','perfilService'];

	function asignacionesController($scope,$rootScope,asignacionesService,$http,$state,perfilService){
		$rootScope.idvendedor='isabella';
		$scope.checkTodos=false;

	
		$scope.getContactosVendedor=getContactosVendedor;
		$scope.getContactosGerente=getContactosGerente;	
		$scope.getNegocios=getNegocios;
		$scope.getNegociosGerente=getNegociosGerente;

		$scope.asignarContactos=asignarContactos;
		$scope.asignarNegocios=asignarNegocios;

		$scope.cambiarVendedor=cambiarVendedor;
		$scope.cambiarNegocioDeVendedor=cambiarNegocioDeVendedor;

		$scope.setVendedor=setVendedor;       
		$scope.setNegocio=setNegocio;
		$scope.setContacto=setContacto;
		$scope.seleccionarTodos=seleccionarTodos;

        //$rootScope.selectedVendedor={user:'gsanchez24',nombre: 'Gisselle Sánchez Pérez'};
        //$scope.gerente={nombre:'Isabella Pérez',user : 'isabella'};

		activate();
		function activate(){
			checarSesion();

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
					  	perfilService.getUsuario($rootScope.user)
							.then(function(data){
								$rootScope.tipoUsuario= data[0].tipo;	
								console.log($rootScope.tipoUsuario);				
							}, function(data){
										console.log("Error:"+data);		
							})
							getVendedores();
							//***setVendedor($rootScope.selectedVendedor);

							//getContactosVendedor($scope.selectedVendedor);
							//getNegocios($scope.selectedVendedor);
							getContactosGerente($rootScope.user);
							getNegociosGerente($rootScope.user);

					  		



					  }
					});

    	};








		function getVendedores(){
			asignacionesService.getVendedoresGerente($rootScope.user)
                .then(function(data){
                    $scope.vendedores=data; 
                    console.log($scope.vendedores);                                    
                    console.log($scope.vendedores);

					
          
            }, function(data){
                console.log("Error:"+data);      
            })



		};

		function setVendedor(vendedor){
			console.log("********************************************************************************************");
			console.log(vendedor);

			$rootScope.selectedVendedor=vendedor;
			getContactosVendedor(vendedor);
			getNegocios(vendedor);

			console.log($rootScope.selectedVendedor);
			


		};

		function getContactosGerente(vendedor){
				asignacionesService.getContactosVendedor(vendedor)
	                .then(function(data){
	                    $scope.contactosGerente=data; 
	                    console.log($scope.contactosGerente);   
	                                 
	                    for(var i=0;i<$scope.contactosGerente.length;i++){
	                    	$scope.contactosGerente[i].isSelected=false;
	                    }
						
	          
	            }, function(data){
	                console.log("Error:"+data);      
	            })

		};


		function getContactosVendedor(vendedor){
			console.log(vendedor);
			asignacionesService.getContactosVendedor(vendedor.user)
                .then(function(data){
                    $scope.contactos=data; 
                    console.log($scope.contactos);   
                                 
                    console.log($scope.contactos);

					
          
            }, function(data){
                console.log("Error:"+data);      
            })

		};

		function getNegocios(vendedor){
			asignacionesService.getNegociosVendedor(vendedor.user)
                .then(function(data){
                    $scope.negocios=data; 
                    console.log($scope.negocios);   
                                 
                    console.log($scope.negocios);

					
          
            }, function(data){
                console.log("Error:"+data);      
            })

		};

		function getNegociosGerente(vendedor){
			console.log("GETTING NEGOCIOS VENDEDOR");
			asignacionesService.getNegociosVendedor(vendedor)
                .then(function(data){
                    $scope.negociosGerente=data; 
                    console.log($scope.negociosGerente);      
                        for(var i=0;i<$scope.negociosGerente.length;i++){
	                    	$scope.negociosGerente[i].isSelected=false;
	                    }
						                          

					
          
            }, function(data){
                console.log("Error:"+data);      
            })

		};




		function asignarContactos(){
			console.log("Asignar Contactos");
			$scope.errorContactos="";
			var error=false;

			$scope.contactosaAsignar=[];
			var cont=0;
			for(var i=0; i< $scope.contactosGerente.length;i++){
				if($scope.contactosGerente[i].isSelected){
					$scope.contactosaAsignar[cont]=$scope.contactosGerente[i];
					cont++;
				}

			}
			if($scope.contactosaAsignar.length==0){
				error=true;
				$scope.errorContactos="Selecciona uno o más contactos a asignar al vendedor";
			}
			console.log(error);
			if(!error){
				asignacionesService.asignarContactos($rootScope.selectedVendedor.user,$scope.contactosaAsignar)
				                .then(function(data){				                
									
				          
				            }, function(data){
				                console.log("Error:"+data);      
				            })
				getContactosVendedor($rootScope.selectedVendedor);
				getContactosGerente($rootScope.user);

				  $("[data-dismiss=modal]").trigger({ type: "click" });
                  $scope.errorContactos='';
                  toastr.success("Contactos Asignados Correctamente!");



			}


		};

		function asignarNegocios(){

			console.log("Asignar Negocios");
			$scope.errorNegocios="";
			var error=false;

			$scope.negociosaAsignar=[];
			var cont=0;
			for(var i=0; i< $scope.negociosGerente.length;i++){
				if($scope.negociosGerente[i].isSelected){
					$scope.negociosaAsignar[cont]=$scope.negociosGerente[i];
					cont++;
				}

			}
			if($scope.negociosaAsignar.length==0){
				error=true;
				$scope.errorNegocios="Selecciona uno o más negocios a asignar al vendedor";
			}
			console.log(error);
			if(!error){
				asignacionesService.asignarNegocios($rootScope.selectedVendedor.user,$scope.negociosaAsignar)
				                .then(function(data){				                
									
				          
				            }, function(data){
				                console.log("Error:"+data);      
				            })

				getNegocios($rootScope.selectedVendedor);
				getNegociosGerente($rootScope.user);


				  $("[data-dismiss=modal]").trigger({ type: "click" });
                  $scope.errorNegocios='';
                  toastr.success("Negocios Asignados Correctamente!");



			}


		};
		function setContacto(contacto){
			console.log("SETTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTING*************************************");
			$rootScope.contactoAReasignar=contacto;
			console.log($rootScope.contactoAReasignar);

		};
		function setNegocio(negocio){
			$rootScope.negocioAReasignar=negocio;

		};


		function cambiarVendedor(){
			console.log("Cambiando vendedor");
			var error=false;
			$scope.errorVendedor="";

			if($scope.cambiovendedor==undefined){
				var error=true;
				$scope.errorVendedor="Ingresa un vendedor nuevo para el contacto";
			}

			if(error==true){
				console.log("Errores");
			}else{
				console.log("No errores");

				asignacionesService.reAsignarContactos($scope.contactoAReasignar.idContacto,$rootScope.selectedVendedor.user,$scope.cambiovendedor.nombre)
				                .then(function(data){			
				                console.log(data);	     
				                   setTimeout(function(){           
										
				                    }, 200);

				            }, function(data){
				                console.log("Error:"+data);      
				            })

						getContactosVendedor($rootScope.selectedVendedor);
						getContactosGerente($rootScope.user);

						  $("[data-dismiss=modal]").trigger({ type: "click" });
		                  $scope.errorContactos='';
		                  toastr.success("Contactos Asignados Correctamente!");
				

			}







		};
		function cambiarNegocioDeVendedor(){
			console.log("Cambiando negocio de vendedor");
			var error=false;
			$scope.errorVendedor="";

			if($scope.cambiovendedor==undefined){
				var error=true;
				$scope.errorVendedor="Ingresa un vendedor nuevo para el negocio";
			}

			if(error==true){
				console.log("Errores");
			}else{
				console.log("No errores");

				asignacionesService.reAsignarNegocio($scope.negocioAReasignar.id,$rootScope.selectedVendedor.user,$scope.cambiovendedor.nombre)
				                .then(function(data){			
				                console.log(data);	     
				                   

				            }, function(data){
				                console.log("Error:"+data);      
				            })

						getNegocios($rootScope.selectedVendedor);
						getNegociosGerente($rootScope.user);

						  $("[data-dismiss=modal]").trigger({ type: "click" });
		                  $scope.errorContactos='';
		                  toastr.success("Operación realizada Correctamente!");				

			}





		};

		function seleccionarTodos(tipo){
			if(tipo=="contactos"){
				if($scope.checkTodos==true){
					for(var i=0;i<$scope.contactosGerente.length;i++)
						$scope.contactosGerente[i].isSelected=true;
				}else{
					for(var i=0;i<$scope.contactosGerente.length;i++)
						$scope.contactosGerente[i].isSelected=false;
				}

			}else{
					if($scope.checkTodos==true){
						for(var i=0;i<$scope.negociosGerente.length;i++)
							$scope.negociosGerente[i].isSelected=true;
					}else{
						for(var i=0;i<$scope.negociosGerente.length;i++)
							$scope.negociosGerente[i].isSelected=false;
					}



			}

			
		};

	};




})();