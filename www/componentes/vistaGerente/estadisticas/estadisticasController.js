(function (){
	angular.module('app').controller('estadisticasController',estadisticasController);
	
	estadisticasController.$inject=['$scope','$rootScope','estadisticasService','grupoService','$http','$state','perfilService','grupoService'];

	function estadisticasController($scope,$rootScope,estadisticasService,grupoService,$http,$state,perfilService,grupoService){
		$scope.panel="individual";
		$scope.filtro="mes";
		$scope.idgerente={};
		$scope.vendedorActual={};

		activate();
		$scope.setfiltro=setfiltro;
		$scope.filtroSemana=filtroSemana;
		$scope.filtroMes=filtroMes;
		$scope.filtroAnnio=filtroAnnio;
		$scope.filtroMesGrupo=filtroMesGrupo;
		$scope.filtroAnnioGrupo=filtroAnnioGrupo;
		$scope.filtroSemanaGrupo=filtroSemanaGrupo;
		$scope.getVendedores=getVendedores;
		$scope.enable=enable;

		$scope.filtroPersonalizado=filtroPersonalizado;
		$scope.filtroPersonalizadoGrupo=filtroPersonalizadoGrupo;
		$scope.setEstadistica=setEstadistica;
		$scope.setGrupoActual=setGrupoActual;
		$scope.setVendedorActual=setVendedorActual;

		function activate(){
			checarSesion();
			
			  $scope.labels2 = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
			  $scope.labelsDias=['Domingo', 'Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
			  $scope.series2 = ['Series A', 'Series B'];

			  $scope.data2 = [
			    [65, 59, 80, 81, 56, 55, 40],
			    [28, 48, 40, 19, 86, 27, 90]
			  ];

		};


    	function checarSesion(){
    		 $http.get("php/checarSesion.php").success(function(data){
					  $scope.sesion=data;
					  console.log("sesion");
					  console.log($scope.sesion);

					  if($scope.sesion=="false"){					
						   $state.go('login');

					  }else{
					  
					  	$scope.vendedorActual.user=$scope.sesion;
					  	$rootScope.user=$scope.sesion;
					  	console.log($rootScope.user);

					  	perfilService.getUsuario($rootScope.user)
							.then(function(data){
								$rootScope.tipoUsuario= data[0].tipo;	
								console.log($rootScope.tipoUsuario);				
							}, function(data){
										console.log("Error:"+data);		
							})

					  	getGrupos();
					  	setGrupoActual2();

						var f = new Date();
						setfiltro("vendedor",$scope.vendedorActual.user,f.getMonth()+1,f.getFullYear());
				  		getVendedores();		  

					  }
					});

    	};




		function getGrupos(){
			console.log($rootScope.user);
				grupoService.getGrupos($rootScope.user)
                .then(function(data){
                    $scope.grupos=data; 
                    console.log($scope.grupos);                    
					
          
                }, function(data){
                    console.log("Error:"+data);      
                })

		};
//falta un metodo en el servucui grupo
		function getVendedores(){
				grupoService.getVendedoresGerente($rootScope.user)
                .then(function(data){
                    $scope.vendedores=data; 
                    console.log($scope.grupos);                    
					
          
                }, function(data){
                    console.log("Error:"+data);      
                })

		}

		function setGrupoActual(grupo){
			$scope.selectedGrupo=grupo.idGrupo;
			$scope.grupoActual=grupo;
			console.log($scope.grupoActual);
			var f = new Date();
			console.log(f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());

			setfiltro("grupo",$scope.grupoActual.idGrupo,f.getMonth()+1,f.getFullYear());


		};

		function setGrupoActual2(){
			if($rootScope.tipoUsuario=="admin"){

			}else{
				grupoService.getGrupoVendedor($rootScope.user)
	                .then(function(data){
	                    $scope.grupoActual=data[0];    
	                    console.log(data);                           
	                             
	                }, function(data){
	                    console.log("Error:"+data);      
	                })
			}
		};

		function setVendedorActual(vendedor){
			$scope.selectedVendedor=vendedor.user;
			$scope.vendedorActual=vendedor;
			console.log($scope.vendedorActual);
			//buscar el primer vendedor en la lista, no tiene que ser el 1
			var f = new Date();
			console.log(f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());
			setfiltro("vendedor",$scope.vendedorActual.user,f.getMonth()+1,f.getFullYear());
		}

		function filtroSemana(){
			console.log("semana");
			console.log(this.tab);

			setfiltro("vendedor",$scope.vendedorActual.user,0,0);
			$scope.enableFiltro=false;



		};
		function filtroSemanaGrupo(){
			console.log("semana");
			console.log(this.tab);
			setfiltro("grupo",$scope.grupoActual.idGrupo,0,0);
			$scope.enableFiltro=false;



		};



		function filtroMes(){
			console.log("filtroMes");
			var f = new Date();
			console.log(f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());

			setfiltro("vendedor",$scope.vendedorActual.user,f.getMonth()+1,f.getFullYear());
			$scope.enableFiltro=false;


		};
		function filtroAnnio(){
			var f = new Date();
			console.log(f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());
			console.log($scope.vendedorActual);
			setfiltro("vendedor",$scope.vendedorActual.user,0,f.getFullYear());
			$scope.enableFiltro=false;


		};
		function filtroMesGrupo(){
			//filtro("vendedor","gsanchez24",4,2016);
			console.log("grupo MES");
			var f = new Date();
			console.log(f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());

			setfiltro("grupo",$scope.grupoActual.idGrupo,f.getMonth()+1,f.getFullYear());
			$scope.enableFiltro=false;


		};
		function filtroAnnioGrupo(){
			//filtro("vendedor","gsanchez24",0,2016);

			var f = new Date();
			console.log(f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());
			console.log("grupo annio");
			setfiltro("grupo",$scope.grupoActual.idGrupo,0,f.getFullYear());
			$scope.enableFiltro=false;



		};




		function setfiltro(tipo,idtipo,mes,annio){
			console.log("mes");
			console.log(idtipo);

				//STATUS Actividades

			estadisticasService.getActividadesCompletadas(tipo,idtipo,mes,annio)
				.then(function(data){
					$scope.statusActividadesCompletadas=data;
					console.log(data);

				},function(data){
					console.log("Error:"+data);
				})

			estadisticasService.getActividadesNoCompletadas(tipo,idtipo,mes,annio)
				.then(function(data){
					$scope.statusActividadesNoCompletadas=data;
					console.log(data);

				},function(data){
					console.log("Error:"+data);
				})



			//TOTALES DE VENTAS
			 estadisticasService.getTotalesVenta(tipo,idtipo,mes,annio)
                .then(function(data){
                    $scope.estadisticasTotalesVenta=data; 
                    console.log($scope.estadisticasTotalesVenta);   
                    $scope.labels=[];

                    if(mes==0 && annio!=0){
                    	$scope.labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
                    }
                    if(mes!=0){
    					for(var i=0;i<31;i++)
                    		$scope.labels[i]=i+1;
                    }
                    if(mes==0 && annio==0){
                    	$scope.labels=['Domingo', 'Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];

                    }
                
                    
				//	$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
					  $scope.series = ['$ Totales de Venta'];
					  $scope.data = [
					    $scope.estadisticasTotalesVenta					    
					  ];
					  $scope.onClick = function (points, evt) {
					    console.log(points,  evt);
					  };
          
                }, function(data){
                    console.log("Error:"+data);      
                })
            //TOTALES DE CONTACTOS
            
			 estadisticasService.getTotalesContactos(tipo,idtipo,mes,annio)
                .then(function(data){
                    $scope.estadisticasTotalesContactos=data; 
                    console.log($scope.estadisticasTotalesContactos);   
                    $scope.labels3=[];
                       if(mes==0 && annio!=0){
                       	console.log("año");
                    	  	$scope.labels3 = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];


                    }
                    if(mes!=0){
                    	console.log("mes");
    					for(var i=0;i<31;i++)
                    		$scope.labels3[i]=i+1;
                    }
                    if(mes==0 && annio ==0){
                    	$scope.labels3=['Domingo', 'Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];

                    }
                
				//	$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
					  $scope.series3 = ['Contactos'];
					  $scope.data3 = [
					    $scope.estadisticasTotalesContactos					    
					  ];
					  $scope.onClick = function (points, evt) {
					    console.log(points,  evt);
					  };
          
                }, function(data){
                    console.log("Error:"+data3);      
                })

                //ACTIVIDADES REALIZADAS

     
			 estadisticasService.getTotalesActividades(tipo,idtipo,mes,annio)
                .then(function(data){
                    $scope.estadisticasTotalActividades=data; 
                    console.log($scope.estadisticasTotalActividades);   
                    $scope.labels4=[];
                     if(mes==0 && annio != 0){
                        $scope.labels4 = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
	

                    }
                    if(mes!=0 && annio!=0){
    					for(var i=0;i<31;i++)
                    		$scope.labels4[i]=i+1;
                    }
                    if(mes==0 && annio==0){
                    	$scope.labels4=['Domingo', 'Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];

                    }
                
				//	$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
					  $scope.series4 = ['Avtividades Realizadas'];
					  $scope.data4 = [
					    $scope.estadisticasTotalActividades					    
					  ];
					  $scope.onClick = function (points, evt) {
					    console.log(points,  evt);
					  };
          
                }, function(data){
                    console.log("Error:"+data4);      
                })


			 estadisticasService.getTotalesNegocios(tipo,idtipo,mes,annio)
                .then(function(data){
                    $scope.estadisticasTotalesNegocios=data; 
                    console.log($scope.estadisticasTotalesNegocios);   
                    $scope.labels5=[];
                    if(mes==0 && annio!=0){
                    	 $scope.labels5 = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];


                    }
                    if(mes!=0){
    					for(var i=0;i<31;i++)
                    		$scope.labels5[i]=i+1;
                    }
                    if(mes==0 && annio==0){
                    	$scope.labels5=['Domingo', 'Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];

                    }
                
				//	$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
					  $scope.series5 = ['Negocios Realizados'];
					  $scope.data5 = [
					    $scope.estadisticasTotalesNegocios					    
					  ];
					  $scope.onClick = function (points, evt) {
					    console.log(points,  evt);
					  };
          
                }, function(data){
                    console.log("Error:"+data5);      
                })





		};
		function enable(){
			$scope.enableFiltro=true;
			console.log("enable");
		}

		function filtroPersonalizado(){

			if($scope.filtroPersonalizado.annio==undefined){
				toastr.warning("Selecciona un año pls");

			}else{

				if($scope.filtroPersonalizado.mes==undefined){
					//búsqueda por año
					console.log("por año");
					setfiltro("vendedor",$scope.vendedorActual.user,0,$scope.filtroPersonalizado.annio);

				}else{
					//bpusqueda por mes
					console.log("por mes año");
					setfiltro("vendedor",$scope.vendedorActual.user,$scope.filtroPersonalizado.mes,$scope.filtroPersonalizado.annio);

				}

			}
			console.log($scope.filtroPersonalizado.annio);
			console.log($scope.filtroPersonalizado.mes);
		};

		function filtroPersonalizadoGrupo(){

			if($scope.filtroPersonalizado.annio==undefined){
				toastr.warning("Selecciona un año pls");

			}else{

				if($scope.filtroPersonalizado.mes==undefined){
					//búsqueda por año
					console.log("por año");
					console.log($scope.grupoActual);
					setfiltro("grupo",$scope.grupoActual.idGrupo,0,$scope.filtroPersonalizado.annio);


				}else{
					//bpusqueda por mes
					console.log("por mes año");
										console.log($scope.grupoActual);

					setfiltro("grupo",$scope.grupoActual.idGrupo,$scope.filtroPersonalizado.mes,$scope.filtroPersonalizado.annio);


				}

			}
			console.log($scope.filtroPersonalizado.annio);
			console.log($scope.filtroPersonalizado.mes);
		};




		function setEstadistica(tipo){
			if(tipo==1){							
				var f = new Date();

				$scope.grupoActual=null;
				$scope.vendedorActual=null;
				$scope.panel="individual";
				$scope.tab=1;
				$scope.vendedorActual={};
				$scope.vendedorActual.user=$scope.sesion;
				console.log("###########################################################################################################################3");
				console.log($scope.sesion);

				setfiltro("vendedor",$scope.vendedorActual.user,f.getMonth()+1,f.getFullYear());

		  		//setfiltro("vendedor","gsanchez24",4,2016);			  
		  		$scope.enableFiltro=false;

			}
			if(tipo==2){
				$scope.panel="grupal";
				$scope.tab=2;
				$scope.vendedorActual=null;
				$scope.enableFiltro=false;

				if($rootScope.tipoUsuario !="admin"){
					setGrupoActual2();
					console.log($scope.grupoActual);

				}


		  		//setfiltro("grupo",1,4,2016);		 


			}
			if(tipo==3){
				$scope.grupoActual=null;
				$scope.panel="porvendedor";
				$scope.tab=3;
		  		$scope.enableFiltro=false;

			}

		};




	}

})();