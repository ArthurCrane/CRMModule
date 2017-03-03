(function(){

	angular.module('app').controller('clientesController',clientesController);

	clientesController.$inject=['$scope','$timeout','$rootScope','$state','$filter','clientesService','configuracionService','$http','$state','perfilService','validationService'];

	function clientesController($scope,$timeout,$rootScope,$state,$filter,clientesService,configuracionService,$http,$state,perfilService,validationService){
		$scope.clientes=[];
		$scope.configClientes=[];
    	$scope.NuevoContacto={};
    	$scope.NuevoContacto.puesto="";
    	$scope.NuevoContacto.telefono="";
    	$scope.NuevoContacto.anotaciones="";
    	$scope.NuevoContacto.imagen="http://localhost/angular/template/server/php/files/userpicture.jpg";
    	$scope.NuevoContacto.hobbies="";
    	$scope.NuevoContacto.preferencias="";
    	$scope.NuevoContacto.estadoCivil="";
    	$scope.NuevoContacto.personalidad="";
    	$scope.NuevoContacto.nombreSecretaria="";
    	$scope.NuevoContacto.telefonoSecretaria="";
    	$scope.NuevoContacto.domicilio="";

		$rootScope.clienteAModificar={};

		$rootScope.clienteAModificar.puesto="";
		$rootScope.clienteAModificar.telefono="";
		$rootScope.clienteAModificar.anotaciones="";		
    	$rootScope.clienteAModificar.imagen="http://localhost/angular/template/server/php/files/userpicture.jpg";
    	$rootScope.clienteAModificar.hobbies="";
    	$rootScope.clienteAModificar.preferencias="";
    	$rootScope.clienteAModificar.estadoCivil="";
    	$rootScope.clienteAModificar.personalidad="";	
    	$rootScope.clienteAModificar.nombreSecretaria="";	
    	$rootScope.clienteAModificar.telefonoSecretaria="";
    	$rootScope.clienteAModificar.domicilio="";

		$rootScope.clienteActualizado={};

		activate();
		$scope.insertCliente=insertCliente;
		$scope.deleteCliente=deleteCliente;
		$scope.updateCliente=updateCliente;
		$scope.setClienteAModificar=setClienteAModificar;
		$scope.setClienteABorrar=setClienteABorrar;

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
				                $scope.NuevoContacto.imagen=file.url;
				                console.log($scope.NuevoContacto.imagen);
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
					                $rootScope.clienteAModificar.imagen=file.url;
					                console.log($rootScope.clienteAModificar.imagen);
					            });
					        }
					    });
				});




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
        	console.log(object.length);
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

        	for(var i=0;i<object.length-1;i++){
        		console.log(object[i]);
        		object[i].imagen="http://localhost/angular/template/server/php/files/userpicture.jpg";
        		object[i].anotaciones="";
        		object[i].hobbies="";
        		object[i].preferencias="";
        		object[i].estadoCivil="";
        		object[i].personalidad="";
        		object[i].idvendedor=$rootScope.user;
        		object[i].fechaRegistro=today;
        		var obj=object[i];


        		 console.log("tratando de insertar");
			          $http.post("php/insertarContacto.php", object[i]).success(function(data,status,headers,config){
			                console.log("Inserted Succesfully");
			                console.log(data[0]);
			                if(data[0]=="error"){
				                	console.log("ERRRRRRRRRRRRROOOOOOOOOR");
				                	//alert("Error con alguno de los contactos");

			                }else{		
			                	getClientes();						
								//$scope.contactos.push(data[0]);	
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

					  		getClientes();
							getConfigurationData();
					  }
					});

    	};



		function getConfigurationData(){
			console.log("configuracion");
			configuracionService.getConfiguracionClientes($rootScope.user)
				.then(function(data){
					$scope.configClientes= data[0];	
					console.log($scope.configClientes);			
				}, function(data){
					console.log("Error:"+data[0]);		
				})


		};
		function getClientes(){
			clientesService.getClientes($rootScope.user)
					.then(function(data){
						$scope.clientes= data;	

						for(i=0;i<$scope.clientes.length;i++){
							console.log("antes");				

							var fecha=new Date($scope.clientes[i].fechaNacimiento);
							fecha.setDate(fecha.getDate()+1);
							$scope.clientes[i].fechaNacimiento=fecha;

							
								console.log("despues");				

						}


						console.log($scope.clientes);				
					}, function(data){
								console.log("Error:"+data);		
					})
		};

		function insertCliente(){
			console.log("insertando cliente ");
			$scope.NuevoContacto.idvendedor=$rootScope.user;
			console.log($scope.NuevoContacto);

			var data=validationService.validateCliente($scope.NuevoContacto);
			$scope.errores=data;
			if(data.errorNombre !=undefined || data.errorCelular!=undefined || data.errorCorreo!=undefined 
			|| data.errorTelefonoOficina != undefined || data.errorFechaNacimiento!=undefined || data.errorTelefonoSecretaria!=undefined){
				console.log("error");



			}else{
				clientesService.insertCliente($scope.NuevoContacto)
						.then(function(data){
							 if(data[0]==""){
					               alert("El cliente ya existe");
				          		}else{								
									$scope.clientes.push(data[0]);	
									console.log($scope.clientes);
									toastr.success("Cliente Agregado Correctamente!");


				            	}	
								$scope.NuevoContacto={};
								$scope.NuevoContacto.puesto="";
						    	$scope.NuevoContacto.telefono="";
						    	$scope.NuevoContacto.anotaciones="";
						    	$scope.NuevoContacto.imagen="http://localhost/angular/template/server/php/files/userpicture.jpg";
						    	$scope.NuevoContacto.hobbies="";
						    	$scope.NuevoContacto.preferencias="";
						    	$scope.NuevoContacto.estadoCivil="";
						    	$scope.NuevoContacto.personalidad="";
						    	$scope.NuevoContacto.nombreSecretaria="";
						    	$scope.NuevoContacto.telefonoSecretaria="";
						    	$scope.NuevoContacto.domicilio="";
								getClientes();
								$("[data-dismiss=modal]").trigger({ type: "click" });
						}, function(data){
									console.log("Error:"+data);		
									toastr.warning("Error al Agregar Cliente ");

						})



			}







		};
		function deleteCliente(){

			//CHECAR SI TIENE VENTAS ASIGNADAS Y VER QUE SE HACE EN TAL CASO
			clientesService.deleteCliente($rootScope.clienteABorrar.idContacto)
					.then(function(data){
						console.log("Deleted Succesfully")
			            console.log(data);
						toastr.success("Cliente Borrado Correctamente!");

			            var index = $scope.clientes.indexOf($scope.clienteABorrar);
						$scope.clientes.splice(index, 1);   
						getClientes();

					}, function(data){
								console.log("Error:"+data);		
								toastr.warning("Cliente Agregado Correctamente!");

					})





		};
		function updateCliente(){
			console.log("updating");

			var data=validationService.validateCliente($scope.clienteAModificar);
			$scope.errores=data;
			if(data.errorNombre !=undefined || data.errorCelular!=undefined || data.errorCorreo!=undefined 
			|| data.errorTelefonoOficina != undefined || data.errorFechaNacimiento!=undefined || data.errorTelefonoSecretaria!=undefined){
				console.log("errores");
			}else{
					var fecha=new Date($rootScope.clienteAModificar.fechaNacimiento);
			        fecha.setDate(fecha.getDate()-1);

			        $rootScope.clienteAModificar.fechaNacimiento=fecha;

					clientesService.updateCliente($rootScope.clienteAModificar)
						.then(function(data){
							console.log(data);

						//  	$rootScope.clienteActualizado.idContacto=$rootScope.clienteAModificar.idContacto;
						  	$rootScope.clienteActualizado.nombreContacto=$rootScope.clienteAModificar.nombreContacto;
						  	$rootScope.clienteActualizado.puesto=$rootScope.clienteAModificar.puesto;
						  	$rootScope.clienteActualizado.empresa=$rootScope.clienteAModificar.empresa;
						  	$rootScope.clienteActualizado.telefono=$rootScope.clienteAModificar.telefono;
						  	$rootScope.clienteActualizado.celular=$rootScope.clienteAModificar.celular;
						  	$rootScope.clienteActualizado.correo=$rootScope.clienteAModificar.correo;
						  	$rootScope.clienteActualizado.fechaNacimiento=$rootScope.clienteAModificar.fechaNacimiento;
						  	$rootScope.clienteActualizado.anotaciones=$rootScope.clienteAModificar.anotaciones;
						  	$rootScope.clienteActualizado.hobbies=$rootScope.clienteAModificar.hobbies;
						  	$rootScope.clienteActualizado.estadoCivil=$rootScope.clienteAModificar.estadoCivil;
						  	$rootScope.clienteActualizado.preferencias=$rootScope.clienteAModificar.preferencias;
						  	$rootScope.clienteActualizado.personalidad=$rootScope.clienteAModificar.personalidad;	
						  	$rootScope.clienteActualizado.nombreSecretaria=$rootScope.clienteAModificar.nombreSecretaria;
						  	$rootScope.clienteActualizado.telefonoSecretaria=$rootScope.clienteAModificar.telefonoSecretaria;
						  	$rootScope.clienteActualizado.domicilio=$rootScope.clienteAModificar.domicilio;
						  	$rootScope.clienteActualizado.imagen=$rootScope.clienteAModificar.imagen;		
						  	var fecha=new Date($rootScope.clienteAModificar.fechaNacimiento);
							fecha.setDate(fecha.getDate()+1);
							$rootScope.clienteAModificar.fechaNacimiento=fecha;
							$rootScope.clienteActualizado.fechaNacimiento=fecha;

				            
								$("[data-dismiss=modal]").trigger({ type: "click" });

								toastr.success("Cliente Actualizado Correctamente!");

								$rootScope.getNotificaciones();

					}, function(data){
								console.log("Error:"+data);	
								toastr.warning("Error al Actualizar ");
	
					})




			}
				
		



		};


		function setClienteAModificar (cliente) {
			console.log("setting");

			$rootScope.clienteAModificar.idContacto=cliente.idContacto;
		  	$rootScope.clienteAModificar.nombreContacto=cliente.nombreContacto;
		  	$rootScope.clienteAModificar.puesto=cliente.puesto;
		  	$rootScope.clienteAModificar.empresa=cliente.empresa;
		  	$rootScope.clienteAModificar.telefono=cliente.telefono;
		  	$rootScope.clienteAModificar.celular=cliente.celular;
		  	$rootScope.clienteAModificar.correo=cliente.correo;
		  	$rootScope.clienteAModificar.fechaNacimiento=cliente.fechaNacimiento;
		  	$rootScope.clienteAModificar.anotaciones=cliente.anotaciones;
		  	$rootScope.clienteAModificar.imagen=cliente.imagen;
		  	$rootScope.clienteAModificar.fechaRegistro=cliente.fechaRegistro;
		  	$rootScope.clienteAModificar.hobbies=cliente.hobbies;
		  	$rootScope.clienteAModificar.preferencias=cliente.preferencias;
		  	$rootScope.clienteAModificar.estadoCivil=cliente.estadoCivil;
		  	$rootScope.clienteAModificar.personalidad=cliente.personalidad;
		  	$rootScope.clienteAModificar.nombreSecretaria=cliente.nombreSecretaria;
		  	$rootScope.clienteAModificar.telefonoSecretaria=cliente.telefonoSecretaria;
		  	$rootScope.clienteAModificar.domicilio=cliente.domicilio;


		  	$rootScope.clienteActualizado=cliente;
		  	console.log(cliente);
		}

		function setClienteABorrar(cliente){

			$rootScope.clienteABorrar=cliente;
			console.log($rootScope.clienteABorrar);

		};

		function uploadFiles(){
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
				                $scope.NuevoContacto.imagen=file.url;
				                console.log($scope.NuevoContacto.imagen);
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
					                $rootScope.clienteAModificar.imagen=file.url;
					                console.log($rootScope.clienteAModificar.imagen);
					            });
					        }
					    });
				});

		};



	}




})();