(function (){
	angular.module('app').controller('objetivosGerenteController',objetivosGerenteController);
	
	objetivosGerenteController.$inject=['$scope','$rootScope','grupoService','objetivosService','validationService','$http','$state','perfilService'];

	function objetivosGerenteController($scope,$rootScope, grupoService,objetivosService,validationService, $http, $state,perfilService){
		$scope.vendedores=[];
		$scope.grupos=[];
        $scope.NuevoObjetivo={};
        $scope.objetivos={};
        $scope.objetivos.gerentevendedor=[];
		    $scope.filtro="Grupal";
		    $scope.checkTodos=false;
        $scope.checkTodos2=false;
        $scope.tab=1;
        $scope.rangoObjetivo="mes";
        $scope.enableFiltro=false;
        $scope.grupoActual={idGrupo:1};
        $scope.vendedorActual={};


		activate();
		$scope.setTipoAsignacion=setTipoAsignacion;
		$scope.seleccionarTodos=seleccionarTodos;
        $scope.getObjetivosGerenteVendedor=getObjetivosGerenteVendedor;
        $scope.getObjetivoGerenteGrupo=getObjetivoGerenteGrupo;
        $scope.agregarObjetivo=agregarObjetivo;
        $scope.getAvanceActividades=getAvanceActividades;
        $scope.filtroMes=filtroMes;
        $scope.filtroAnnio=filtroAnnio;
        $scope.filtroPersonalizado=filtroPersonalizado;
        $scope.enable=enable;
        $scope.resetForm=resetForm;

		function activate(){
            checarSesion();
			


		};

    function resetForm(){
      console.log("resetear forma");
      $scope.errores={};
      $scope.errorObjetivo="";
      $scope.NuevoObjetivo={};   
    

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

                                getVendedores();
                                getGrupos();
                                getGrupoActual();
        
                            }, function(data){
                                        console.log("Error:"+data);     
                            })

                  
                    var f = new Date();
                    console.log(f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());

                    $scope.mes=f.getMonth()+1;
                    $scope.annio=f.getFullYear();
                    $scope.tipoAsignacion="Personal";
                    console.log($scope.vendedorActual);

                    getObjetivosVendedor($scope.vendedorActual);
                    getAvanceActividades("vendedor",$scope.vendedorActual.user,$scope.mes,$scope.annio);
                    getAvanceContactos("vendedor",$scope.vendedorActual.user,$scope.mes,$scope.annio);
                    getAvanceTotalesVenta("vendedor",$scope.vendedorActual.user,$scope.mes,$scope.annio);
                    getAvanceNegociosGanados("vendedor",$scope.vendedorActual.user,$scope.mes,$scope.annio);
                    getAvanceActividadesTipo("vendedor",$scope.vendedorActual,$scope.mes,$scope.annio);       

                      }
                    });

        };





        function getWidth(){
            return '50%';
        };
		function getVendedores(){
				grupoService.getVendedoresGerente($rootScope.user)
                .then(function(data){
                    $scope.vendedores=data; 
                    console.log($scope.grupos);   
                       for(var i=0;i<$scope.vendedores.length;i++){
                        $scope.vendedores[i].isSelected=false;
                    }                 
                                        console.log($scope.vendedores);

					
          
                }, function(data){
                    console.log("Error:"+data);      
                })

		};



		function getGrupos(){
				grupoService.getGrupos($rootScope.user)
                .then(function(data){
                    $scope.grupos=data; 
                    console.log($scope.grupos); 
                      for(var i=0;i<$scope.grupos.length;i++){
                        $scope.grupos[i].isSelected=false;
                    }                 
					                   
					
                    console.log($scope.grupos);
                }, function(data){
                    console.log("Error:"+data);      
                })


		};

    function getGrupoActual(){

      if($rootScope.tipoUsuario=="admin"){
        $scope.grupoActual=$scope.grupos[0];

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

        function getObjetivoGerenteGrupo(grupo){
            $scope.selectedGrupo=grupo.idGrupo;
            $scope.grupoActual=grupo;
            console.log("////////////////////////////////////////////////////////////////////////////////////////////////");
            console.log($scope.grupoActual);
            getAvanceActividades('grupo',$scope.grupoActual.idGrupo,$scope.mes,$scope.annio);
            getAvanceContactos('grupo',$scope.grupoActual.idGrupo,$scope.mes,$scope.annio);
            getAvanceTotalesVenta('grupo',$scope.grupoActual.idGrupo,$scope.mes,$scope.annio);
            getAvanceNegociosGanados('grupo',$scope.grupoActual.idGrupo,$scope.mes,$scope.annio);
            getAvanceActividadesTipo('grupo',$scope.grupoActual.idGrupo,$scope.mes,$scope.annio);
                

             setTimeout(function(){
                  console.log("2////////////////////////////////////////////////////////////////////////////////////////////////");
                  console.log($scope.grupoActual);
                    objetivosService.getObjetivoGerenteGrupo($rootScope.user,$scope.grupoActual.idGrupo,$scope.mes,$scope.annio)
                    .then(function(data){
                        $scope.objetivos.gerentegrupo=data;
                        console.log(data);
                        
                         for(i=0;i<$scope.objetivos.gerentegrupo.length;i++){
                            console.log($scope.objetivos.gerentegrupo[i]);
                            if($scope.objetivos.gerentegrupo[i].tipo=='Actividades')
                                $scope.objetivos.gerentegrupo[i].porcentaje=$scope.avanceActividades * 100 / $scope.objetivos.gerentegrupo[i].cantidad;
                             if($scope.objetivos.gerentegrupo[i].tipo=='Contactos')
                                $scope.objetivos.gerentegrupo[i].porcentaje=$scope.avanceContactos*100 / $scope.objetivos.gerentegrupo[i].cantidad;
                             if($scope.objetivos.gerentegrupo[i].tipo=='Negocios Ganados')
                                $scope.objetivos.gerentegrupo[i].porcentaje=$scope.avanceNegociosGanados*100 / $scope.objetivos.gerentegrupo[i].cantidad;
                             if($scope.objetivos.gerentegrupo[i].tipo=='Totales de Ventas')
                                $scope.objetivos.gerentegrupo[i].porcentaje=$scope.avanceTotalesVenta*100 / $scope.objetivos.gerentegrupo[i].cantidad;


                            if($scope.objetivos.gerentegrupo[i].tipo=='Llamadas')
                                $scope.objetivos.gerentegrupo[i].porcentaje=$scope.avanceLlamadas * 100 / $scope.objetivos.gerentegrupo[i].cantidad;
                             if($scope.objetivos.gerentegrupo[i].tipo=='Comidas')
                                $scope.objetivos.gerentegrupo[i].porcentaje=$scope.avanceComidas*100 / $scope.objetivos.gerentegrupo[i].cantidad;
                             if($scope.objetivos.gerentegrupo[i].tipo=='Reuniones')
                                $scope.objetivos.gerentegrupo[i].porcentaje=$scope.avanceReuniones*100 / $scope.objetivos.gerentegrupo[i].cantidad;
                             if($scope.objetivos.gerentegrupo[i].tipo=='Tareas')
                                $scope.objetivos.gerentegrupo[i].porcentaje=$scope.avanceTareas*100 / $scope.objetivos.gerentegrupo[i].cantidad;
                            console.log($scope.objetivos.gerentegrupo[i].porcentaje);

                          }







                    },function(data){
                        console.log("Error:"+data);
                    })


              }, 300);


        };

        function getObjetivosVendedor(vendedor){
            $scope.vendedorActual=vendedor;
                console.log(vendedor);
                 console.log(vendedor);
                    console.log("******************************************************************************");
                    console.log($scope.mes);
                    console.log($scope.annio);

                getAvanceActividades('vendedor',$scope.vendedorActual.user,$scope.mes,$scope.annio);
                getAvanceContactos('vendedor',$scope.vendedorActual.user,$scope.mes,$scope.annio);
                getAvanceTotalesVenta('vendedor',$scope.vendedorActual.user,$scope.mes,$scope.annio);
                getAvanceNegociosGanados('vendedor',$scope.vendedorActual.user,$scope.mes,$scope.annio);
                getAvanceActividadesTipo('vendedor',$scope.vendedorActual.user,$scope.mes,$scope.annio);

             setTimeout(function(){


                objetivosService.getObjetivosVendedor(vendedor.user,$scope.mes,$scope.annio)
                    .then(function(data){
                        $scope.objetivos.vendedor=data; 
                        console.log(data);

                          for(i=0;i<$scope.objetivos.vendedor.length;i++){
                            console.log($scope.objetivos.vendedor[i]);
                            if($scope.objetivos.vendedor[i].tipo=='Actividades')
                                $scope.objetivos.vendedor[i].porcentaje=$scope.avanceActividades * 100 / $scope.objetivos.vendedor[i].cantidad;
                             if($scope.objetivos.vendedor[i].tipo=='Contactos')
                                $scope.objetivos.vendedor[i].porcentaje=$scope.avanceContactos*100 / $scope.objetivos.vendedor[i].cantidad;
                             if($scope.objetivos.vendedor[i].tipo=='Negocios Ganados')
                                $scope.objetivos.vendedor[i].porcentaje=$scope.avanceNegociosGanados*100 / $scope.objetivos.vendedor[i].cantidad;
                             if($scope.objetivos.vendedor[i].tipo=='Totales de Ventas')
                                $scope.objetivos.vendedor[i].porcentaje=$scope.avanceTotalesVenta*100 / $scope.objetivos.vendedor[i].cantidad;


                            if($scope.objetivos.vendedor[i].tipo=='Llamadas')
                                $scope.objetivos.vendedor[i].porcentaje=$scope.avanceLlamadas * 100 / $scope.objetivos.vendedor[i].cantidad;
                             if($scope.objetivos.vendedor[i].tipo=='Comidas')
                                $scope.objetivos.vendedor[i].porcentaje=$scope.avanceComidas*100 / $scope.objetivos.vendedor[i].cantidad;
                             if($scope.objetivos.vendedor[i].tipo=='Reuniones')
                                $scope.objetivos.vendedor[i].porcentaje=$scope.avanceReuniones*100 / $scope.objetivos.vendedor[i].cantidad;
                             if($scope.objetivos.vendedor[i].tipo=='Tareas')
                                $scope.objetivos.vendedor[i].porcentaje=$scope.avanceTareas*100 / $scope.objetivos.vendedor[i].cantidad;
                            console.log($scope.objetivos.vendedor[i].porcentaje);

                          }
                       




                      }, function(data){
                    console.log("Error:"+data);      
                })

              }, 200);

        };

        function getObjetivosGerenteVendedor(vendedor){
            $scope.selectedVendedor=vendedor.user;

            $scope.vendedorActual=vendedor;

                getAvanceActividades('vendedor',$scope.vendedorActual.user,$scope.mes,$scope.annio);
                getAvanceContactos('vendedor',$scope.vendedorActual.user,$scope.mes,$scope.annio);
                getAvanceTotalesVenta('vendedor',$scope.vendedorActual.user,$scope.mes,$scope.annio);
                getAvanceNegociosGanados('vendedor',$scope.vendedorActual.user,$scope.mes,$scope.annio);
                getAvanceActividadesTipo('vendedor',$scope.vendedorActual.user,$scope.mes,$scope.annio);
                


              setTimeout(function(){

                    console.log(vendedor);
                    console.log("******************************************************************************");
                    console.log($scope.mes);
                    console.log($scope.annio);
                    objetivosService.getObjetivoGerenteVendedor($rootScope.user,vendedor.user,$scope.mes,$scope.annio)
                    .then(function(data){
                        $scope.objetivos.gerentevendedor=data; 
                        console.log(data);
                        console.log($scope.avanceActividades);

                        var x;
                        console.log($scope.objetivos.gerentevendedor);
                      for(i=0;i<$scope.objetivos.gerentevendedor.length;i++){
                        console.log($scope.objetivos.gerentevendedor[i]);
                        if($scope.objetivos.gerentevendedor[i].tipo=='Actividades')
                            $scope.objetivos.gerentevendedor[i].porcentaje=$scope.avanceActividades * 100 / $scope.objetivos.gerentevendedor[i].cantidad;
                         if($scope.objetivos.gerentevendedor[i].tipo=='Contactos')
                            $scope.objetivos.gerentevendedor[i].porcentaje=$scope.avanceContactos*100 / $scope.objetivos.gerentevendedor[i].cantidad;
                         if($scope.objetivos.gerentevendedor[i].tipo=='Negocios Ganados')
                            $scope.objetivos.gerentevendedor[i].porcentaje=$scope.avanceNegociosGanados*100 / $scope.objetivos.gerentevendedor[i].cantidad;
                         if($scope.objetivos.gerentevendedor[i].tipo=='Totales de Ventas')
                            $scope.objetivos.gerentevendedor[i].porcentaje=$scope.avanceTotalesVenta*100 / $scope.objetivos.gerentevendedor[i].cantidad;


                        if($scope.objetivos.gerentevendedor[i].tipo=='Llamadas')
                            $scope.objetivos.gerentevendedor[i].porcentaje=$scope.avanceLlamadas * 100 / $scope.objetivos.gerentevendedor[i].cantidad;
                         if($scope.objetivos.gerentevendedor[i].tipo=='Comidas')
                            $scope.objetivos.gerentevendedor[i].porcentaje=$scope.avanceComidas*100 / $scope.objetivos.gerentevendedor[i].cantidad;
                         if($scope.objetivos.gerentevendedor[i].tipo=='Reuniones')
                            $scope.objetivos.gerentevendedor[i].porcentaje=$scope.avanceReuniones*100 / $scope.objetivos.gerentevendedor[i].cantidad;
                         if($scope.objetivos.gerentevendedor[i].tipo=='Tareas')
                            $scope.objetivos.gerentevendedor[i].porcentaje=$scope.avanceTareas*100 / $scope.objetivos.gerentevendedor[i].cantidad;
                        console.log($scope.objetivos.gerentevendedor[i].porcentaje);

                      }
                   

                                                           
                        console.log($scope.objetivos.gerentevendedor);
                    }, function(data){
                        console.log("Error:"+data);      
                    })

                
           
             }, 200);


        
              
                  console.log($scope.objetivos.gerentevendedor);


                                        
        };

        function getAvanceActividades(tipo,idtipo,mes,annio){
            console.log("avance Actividades");

                objetivosService.getAvanceActividades(tipo,idtipo,mes,annio)
                     .then(function(data){

                        console.log(data);                                  
                        $scope.avanceActividades=data[0].cont;                                                            
                        }, function(data){
                            console.log("Error:"+data);      
                        })                  
                     
        };

        function getAvanceContactos(tipo,idtipo,mes,annio){
            console.log("avance Actividades");
            console.log(tipo);
            console.log(idtipo);
            console.log(mes);
            console.log(annio);

                objetivosService.getAvanceContactos(tipo,idtipo,mes,annio)
                     .then(function(data){
                        console.log(data);                                  
                        $scope.avanceContactos=data[0].cont;                                                          
                        }, function(data){
                            console.log("Error:"+data);      
                        })     
        };

        function getAvanceNegociosGanados(tipo,idtipo,mes,annio){            
                objetivosService.getAvanceNegociosGanados(tipo,idtipo,mes,annio)
                     .then(function(data){
                        console.log(data);                                  
                        $scope.avanceNegociosGanados=data[0].cont;          
                        console.log($scope.avanceNegociosGanados);                                                  
                        }, function(data){
                            console.log("Error:"+data);      
                        })     

        };

        function getAvanceTotalesVenta(tipo,idtipo,mes,annio){
               objetivosService.getAvanceTotalesVenta(tipo,idtipo,mes,annio)
                     .then(function(data){
                        console.log(data);                                  
                        $scope.avanceTotalesVenta=data[0].total;          
                        console.log($scope.avanceTotalesVenta);                                                  
                        }, function(data){
                            console.log("Error:"+data);      
                        })     

        };

        function getAvanceActividadesTipo(tipo,idtipo,mes,annio){
                objetivosService.getAvanceActividadesTipo(tipo,idtipo,mes,annio)
                     .then(function(data){
                        console.log(data);                     
                        if(data.length>0){
                            for(i=0;i<data.length;i++){
                                if(data[i].tipo=="Comida")
                                    $scope.avanceComidas=data[i].cont;
                                if(data[i].tipo=="Llamada")
                                    $scope.avanceLlamadas=data[i].cont;
                                if(data[i].tipo=="Reunión")
                                    $scope.avanceReuniones=data[i].cont;
                                if(data[i].tipo="Tarea Descubierta")
                                    $scope.avanceTareas=data[i].cont;

                            }

                        }else{

                            $scope.avanceComidas=0;
                            $scope.avanceLlamadas=0;
                            $scope.avanceReuniones=0;
                            $scope.avanceTareas=0;
                        }             

                    

                        }, function(data){
                            console.log("Error:"+data);      
                        })     


        };


        function filtroMes(tipo,idtipo){
            console.log("filtroMes");
            var f = new Date();
       
            $scope.mes=f.getMonth()+1;
            $scope.annio=f.getFullYear();


                if(tipo=="vendedor"){
                    getObjetivosGerenteVendedor($scope.vendedorActual);
                   getObjetivosGerenteVendedor($scope.vendedorActual);
                }
                if(tipo=="grupo"){
                        getObjetivoGerenteGrupo($scope.grupoActual);
                        getObjetivoGerenteGrupo($scope.grupoActual);

                }
                  if(tipo=="personal"){
                    getObjetivosVendedor($scope.vendedorActual);
                    getObjetivosVendedor($scope.vendedorActual);
                  }

                
           


            $scope.enableFiltro=false;


        };
        function filtroAnnio(tipo,idtipo){
            var f = new Date();

            console.log(f.getFullYear);
            console.log(f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());
          
                $scope.mes=0;
                $scope.annio=f.getFullYear();


                if(tipo=="vendedor"){
                    getObjetivosGerenteVendedor($scope.vendedorActual);
                   getObjetivosGerenteVendedor($scope.vendedorActual);
                }
                if(tipo=="grupo"){
                    getObjetivoGerenteGrupo($scope.grupoActual);
                    getObjetivoGerenteGrupo($scope.grupoActual);


                }
                if(tipo=="personal"){
                    getObjetivosVendedor($scope.vendedorActual);
                    getObjetivosVendedor($scope.vendedorActual);
                }

            $scope.enableFiltro=false;


        };


        function filtroPersonalizado(tipo,idtipo){
          console.log("{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{");
          console.log(tipo);

            if($scope.filtroPersonalizado.annio==undefined){
                toastr.warning("Selecciona un año");

            }else{

                if($scope.filtroPersonalizado.mes==undefined){
                    //búsqueda por año
                    console.log("por año");
                    console.log($scope.filtroPersonalizado.annio);

                  

                    $scope.annio=$scope.filtroPersonalizado.annio;
                    $scope.mes=0;

                    setTimeout(function(){
                        //do what you need here    

                        if(tipo=="vendedor"){
                            getObjetivosGerenteVendedor($scope.vendedorActual);
                           getObjetivosGerenteVendedor($scope.vendedorActual);
                        }

                        if(tipo=="grupo"){
                                                    console.log("grupoo");

                            getObjetivoGerenteGrupo($scope.grupoActual);
                            getObjetivoGerenteGrupo($scope.grupoActual);


                        }

                        if(tipo=="personal"){
                          console.log("personallll");

                            getObjetivosVendedor($scope.vendedorActual);
                            getObjetivosVendedor($scope.vendedorActual);
                        }
                    }, 400);
                    console.log($scope.filtroPersonalizado.annio);



                }else{
                    //bpusqueda por mes
                    console.log("por mes año");
                    console.log($scope.filtroPersonalizado.annio);
             

                    $scope.annio=$scope.filtroPersonalizado.annio;
                    $scope.mes=$scope.filtroPersonalizado.mes;


                        if(tipo=="vendedor"){
                            getObjetivosGerenteVendedor($scope.vendedorActual);
                           getObjetivosGerenteVendedor($scope.vendedorActual);
                        }
                        if(tipo=="grupo"){
                            getObjetivoGerenteGrupo($scope.grupoActual);
                            getObjetivoGerenteGrupo($scope.grupoActual);


                        }
                        if(tipo=="personal"){                          
                            getObjetivosVendedor($scope.vendedorActual);
                            getObjetivosVendedor($scope.vendedorActual);
                        }

                    console.log($scope.filtroPersonalizado.annio);




                }

            }
            console.log($scope.filtroPersonalizado.annio);
            console.log($scope.filtroPersonalizado.mes);
        };

        function enable(){
            $scope.enableFiltro=true;
            console.log("enable");
        }







		function setTipoAsignacion(tipo){
			console.log(tipo);
			if(tipo==1){
                $scope.tab=1;
                $scope.tipoAsignacion="Personal";
                $scope.vendedorActual={user:$rootScope.user};
                getObjetivosVendedor($scope.vendedorActual);
              
            }
            if(tipo==2){
                $scope.tab=2;
                $scope.tipoAsignacion="Grupal";
                console.log($scope.grupoActual);

                getObjetivoGerenteGrupo($scope.grupoActual);
              

            }
            if(tipo==3){
                $scope.tab=3;
                $scope.tipoAsignacion="Individual";

                getObjetivosGerenteVendedor($scope.vendedorActual);
              


            }
		
		};

        function agregarObjetivo(){
          console.log($scope.tipoAsignacion);
            $scope.NuevoObjetivo.anotaciones="";
            console.log($scope.rangoObjetivo);
           
            $scope.errores=validationService.validateObjetivo($scope.NuevoObjetivo,$scope.rangoObjetivo);
            console.log($scope.errores);

            if(! ($scope.errores.errorTipo!=undefined||$scope.errores.errorCantidad!=undefined || ($scope.rangoObjetivo=='mes' && $scope.errores.errorMes!=undefined) || ($scope.rangoObjetivo=='annio' && $scope.errores.errorAnnio!=undefined) ) ){
              /* no hay error*/  
              console.log("no hay errores");
                if($scope.tipoAsignacion=="Personal" || ($scope.tipoAsignacion=="Grupal" && $rootScope.tipoUsuario!="admin") || ($scope.tipoAsignacion=="Individual" && $rootScope.tipoUsuario!="admin") ){   
                    console.log("uno///////////////////////////////////////////////////////////////////////Personal");

                    if($scope.rangoObjetivo=='mes'){
                        console.log($scope.NuevoObjetivo.mes);    
                        $scope.NuevoObjetivo.fechaInicio= new Date($scope.NuevoObjetivo.mes.getYear()+1900,$scope.NuevoObjetivo.mes.getMonth(),1);
                        $scope.NuevoObjetivo.fechaTerminacion= new Date($scope.NuevoObjetivo.mes.getYear()+1900,$scope.NuevoObjetivo.mes.getMonth()+1,1);                  
                    }else{
                        $scope.NuevoObjetivo.fechaInicio=new Date($scope.NuevoObjetivo.annio,0,1);
                        var annio=parseInt($scope.NuevoObjetivo.annio)+1;
                        console.log(annio);
                        $scope.NuevoObjetivo.fechaTerminacion=new Date(annio,0,1);
                    }

                      $scope.existe="false";
                      objetivosService.verificarObjetivo('Personal',$rootScope.user,$rootScope.user,$scope.NuevoObjetivo)
                                      .then(function(data){
                                        console.log(data);
                                        $scope.error=data;
                                        console.log($scope.error);
                                        if($scope.error==0){
                                               objetivosService.agregarObjetivo('Personal',$rootScope.user, $rootScope.user,$scope.NuevoObjetivo)
                                              .then(function(data){
                                                  console.log(data);                                  
                                                 // console.log($scope.objetivosGerenteVendedor);
                                              toastr.success("Objetivo Agregado Correctamente!");


                                              }, function(data){
                                                  console.log("Error:"+data);      
                                              })
                                            $("[data-dismiss=modal]").trigger({ type: "click" });
                                            $scope.errores={};
                                            $scope.errorObjetivo="";
                                            $scope.NuevoObjetivo={};
                                            console.log("**********************///////////////*************************+");
                                          console.log($rootScope.user);
                                            $scope.vendedorActual.user=$rootScope.user;
                                            getObjetivosVendedor($scope.vendedorActual);
                                            $rootScope.getNotificaciones();

                                        console.log("tres");
                                      }else{
                                        $scope.errorObjetivo="Ya tienes asignado este tipo de objetivo para este rango";
                                      }





                                      },function(data){
                                        console.log("Error:"+data);
                                      })
                   


                 }
                if($scope.tipoAsignacion=="Grupal" && $rootScope.tipoUsuario=="admin"){
                    console.log("dos///////////////////////////////////////////////////////////////////////Grupal");

                    if($scope.rangoObjetivo=='mes'){
                        console.log($scope.NuevoObjetivo.mes);    
                        $scope.NuevoObjetivo.fechaInicio= new Date($scope.NuevoObjetivo.mes.getYear()+1900,$scope.NuevoObjetivo.mes.getMonth(),1);
                        $scope.NuevoObjetivo.fechaTerminacion= new Date($scope.NuevoObjetivo.mes.getYear()+1900,$scope.NuevoObjetivo.mes.getMonth()+1,1);                  
                    }else{
                        $scope.NuevoObjetivo.fechaInicio=new Date($scope.NuevoObjetivo.annio,0,1);
                        var annio=parseInt($scope.NuevoObjetivo.annio)+1;
                        console.log(annio);
                        $scope.NuevoObjetivo.fechaTerminacion=new Date(annio,0,1);
                    }
                    var cont=0;
                    for(i=0; i< $scope.grupos.length;i++){
                        if($scope.grupos[i].isSelected==true)
                            cont=cont+1;
                    }
                      if(cont == 0 ){
                        $scope.errores.errorGrupos="Selecciona uno o más grupos";                       
                    }else{
                        console.log("grupal2");
                        $scope.error=0;
                        for(i=0;i<$scope.grupos.length;i++){
                          if($scope.grupos[i].isSelected==true){         
                             objetivosService.verificarObjetivo('Grupal',$rootScope.user,$scope.grupos[i].idGrupo,$scope.NuevoObjetivo)
                                  .then(function(data){
                                    if(data==1)
                                      $scope.error=1;
                                    console.log(data);                                
                                  if($scope.error==0){
                                      for(i=0; i< $scope.grupos.length;i++){                        
                                      if($scope.grupos[i].isSelected==true){                        
                                          objetivosService.agregarObjetivo('Grupal',$rootScope.user,$scope.grupos[i].idGrupo,$scope.NuevoObjetivo)
                                                  .then(function(data){
                                                      //$scope.objetivos.gerentevendedor=data; 
                                                      console.log(data);                                  
                                                     // console.log($scope.objetivosGerenteVendedor);
                                                                  toastr.success("Objetivo Agregado Correctamente!");

                                                  }, function(data){
                                                      console.log("Error:"+data);      
                                                  })
                                          }      
                                      } //fin del for
                                    $("[data-dismiss=modal]").trigger({ type: "click" });
                                    $scope.errores={};
                                    $scope.errorObjetivo="";
                                    $scope.NuevoObjetivo={};
                                    getObjetivoGerenteGrupo($scope.grupoActual);
                                      $rootScope.getNotificaciones();


                                  }else{
                                    $scope.errorObjetivo="Ya tienes asignado ese tipo de objetivo para uno de los grupos";

                                  }
                               
                                  },function(data){
                                    console.log("Error:"+data);
                                  })
                          }               

                        }



                    }


                }
                if($scope.tipoAsignacion=="Individual" && $rootScope.tipoUsuario=="admin"){
                                      console.log("tres///////////////////////////////////////////////////////////////////////Individual");

                    if($scope.rangoObjetivo=='mes'){
                        console.log($scope.NuevoObjetivo.mes);    
                        $scope.NuevoObjetivo.fechaInicio= new Date($scope.NuevoObjetivo.mes.getYear()+1900,$scope.NuevoObjetivo.mes.getMonth(),1);
                        $scope.NuevoObjetivo.fechaTerminacion= new Date($scope.NuevoObjetivo.mes.getYear()+1900,$scope.NuevoObjetivo.mes.getMonth()+1,1);                  
                    }else{
                        $scope.NuevoObjetivo.fechaInicio=new Date($scope.NuevoObjetivo.annio,0,1);
                        var annio=parseInt($scope.NuevoObjetivo.annio)+1;
                        console.log(annio);
                        $scope.NuevoObjetivo.fechaTerminacion=new Date(annio,0,1);
                    }
                    var cont=0;
                    for(i=0; i< $scope.vendedores.length;i++){
                        if($scope.vendedores[i].isSelected==true)
                            cont=cont+1;
                    }
                    if(cont == 0 ){
                        $scope.errores.errorVendedores="Selecciona uno o más vendedores";                       
                    }else{
                        $scope.error=0;
                        for(i=0; i< $scope.vendedores.length;i++){                        
                            if($scope.vendedores[i].isSelected==true){                        
                                objetivosService.verificarObjetivo('Individual',$rootScope.user,$scope.vendedores[i].user,$scope.NuevoObjetivo)
                                        .then(function(data){
                                            console.log(data);  
                                            if(data==1) $scope.error=1;

                                               if($scope.error==0){
                                                 for(i=0; i< $scope.vendedores.length;i++){                        
                                                  if($scope.vendedores[i].isSelected==true){                        
                                                      objetivosService.agregarObjetivo('Individual',$rootScope.user,$scope.vendedores[i].user,$scope.NuevoObjetivo)
                                                              .then(function(data){
                                                                  //$scope.objetivos.gerentevendedor=data; 
                                                                  console.log(data);                                  
                                                                   toastr.success("Objetivo Agregado Correctamente!");

                                                              }, function(data){
                                                                  console.log("Error:"+data);      
                                                              })
                                                  }                    
                                               }//fin del for        
                                                $("[data-dismiss=modal]").trigger({ type: "click" });
                                                $scope.errores={};
                                                $scope.errorObjetivo="";
                                                $scope.NuevoObjetivo={};
                                                getObjetivosGerenteVendedor($scope.vendedorActual);
                                                                $rootScope.getNotificaciones();


                                             }else{
                                              $scope.errorObjetivo="Ya tienes asignado este tipo de objetivo para uno de los vendedores";

                                             }
                                        }, function(data){
                                            console.log("Error:"+data);      
                                        })
                            }                    
                         }//fin del for
                      
                

                    }
           

                }//fin if Individual.






            }else{
                console.log("hay errores");
            }

            
    




        };



        function seleccionarTodos(tipo){
            console.log(tipo);
            console.log($scope.checkTodos2);
            console.log($scope.checkTodos);

            if(tipo==1){
                console.log("grupos");
                if($scope.checkTodos==true){
                    $scope.checkTodos=false;
                    for(var i=0;i<$scope.grupos.length;i++)
                        $scope.grupos[i].isSelected=false;
                }else{
                      $scope.checkTodos=true;
                     for(var i=0;i<$scope.grupos.length;i++)
                        $scope.grupos[i].isSelected=true;
                }

            }else{
                console.log("vendedores");
                if($scope.checkTodos2==true){
                    $scope.checkTodos2=false;
                     for(var i=0;i<$scope.vendedores.length;i++)
                        $scope.vendedores[i].isSelected=false;
                    

                }else{
                    $scope.checkTodos2=true;
                     for(var i=0;i<$scope.vendedores.length;i++)
                        $scope.vendedores[i].isSelected=true;


                }
            }
            /*
        	console.log($scope.checkTodos);
        	console.log($scope.checkTodos2);
        	if(tipo==1){
        		console.log("grupos");

        	}else{
        		 console.log("vendedores");

        		if($scope.checkTodos2==true){
        			console.log("changee");
                for(var i=0;i<$scope.vendedores.length;i++)
                        $scope.vendedores[i].isSelected=true;
                    

           		}else{
                for(var i=0;i<$scope.vendedores.length;i++)
                        $scope.vendedores[i].isSelected=false;
                    

          		}

        	}
        	console.log($scope.vendedores)
            console.log("checkbox");

          */
        }; 	






	}
})();		