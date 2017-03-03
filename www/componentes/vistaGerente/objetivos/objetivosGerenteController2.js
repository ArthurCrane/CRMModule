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
               // $scope.seleccionarTodos=seleccionarTodos;
                $scope.getObjetivosGerenteVendedor=getObjetivosGerenteVendedor;
                $scope.getObjetivoGerenteGrupo=getObjetivoGerenteGrupo;
             //   $scope.agregarObjetivo=agregarObjetivo;
               // $scope.getAvanceActividades=getAvanceActividades;
               $scope.filtroMes=filtroMes;
                $scope.filtroAnnio=filtroAnnio;
                $scope.filtroPersonalizado=filtroPersonalizado;
               $scope.enable=enable;

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
                                $scope.vendedorActual.user=$scope.sesion;
                                $rootScope.user=$scope.sesion;
                                console.log($rootScope.user);

                                perfilService.getUsuario('isabella')
                                    .then(function(data){
                                        $rootScope.tipoUsuario= data[0].tipo;   
                                        console.log($rootScope.tipoUsuario);                
                                    }, function(data){
                                                console.log("Error:"+data);     
                                    })

                            getVendedores();
                            getGrupos();
                    //        getGrupoActual();

                            var f = new Date();
                            console.log(f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());

                            $scope.mes=f.getMonth()+1;
                            $scope.annio=f.getFullYear();
                            $scope.tipoAsignacion="Personal";
                            console.log($scope.vendedorActual);

                            getObjetivosVendedor($scope.vendedorActual);

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



     function getObjetivoGerenteGrupo(grupo){
            $scope.selectedGrupo=grupo.idGrupo;
            $scope.grupoActual=grupo;
           // console.log($scope.grupoActual);
      
             setTimeout(function(){
                    objetivosService.getObjetivoGerenteGrupo($rootScope.user,grupo.idGrupo,$scope.mes,$scope.annio)
                    .then(function(data){
                        $scope.objetivos.gerentegrupo=data;
                        console.log(data);                    


                    },function(data){
                        console.log("Error:"+data);
                    })


              }, 200);


        };

        function getObjetivosVendedor(vendedor){
            $scope.vendedorActual=vendedor;
                console.log(vendedor);
                 console.log(vendedor);
            
             setTimeout(function(){


                objetivosService.getObjetivosVendedor(vendedor.user,$scope.mes,$scope.annio)
                    .then(function(data){
                        $scope.objetivos.vendedor=data; 
                        console.log(data);


                      }, function(data){
                    console.log("Error:"+data);      
                })

              }, 200);

        };

        function getObjetivosGerenteVendedor(vendedor){
            $scope.selectedVendedor=vendedor.user;

            $scope.vendedorActual=vendedor;


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

                
                   

                                                           
                        console.log($scope.objetivos.gerentevendedor);
                    }, function(data){
                        console.log("Error:"+data);      
                    })

                
           
             }, 200);


        
              
                  console.log($scope.objetivos.gerentevendedor);


                                        
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
                getAvanceActividades("vendedor",$scope.vendedorActual.user,$scope.mes,$scope.annio);
                getAvanceContactos("vendedor",$scope.vendedorActual.user,$scope.mes,$scope.annio);
                getAvanceTotalesVenta("vendedor",$scope.vendedorActual.user,$scope.mes,$scope.annio);
                getAvanceNegociosGanados("vendedor",$scope.vendedorActual.user,$scope.mes,$scope.annio);
                getAvanceActividadesTipo("vendedor",$scope.vendedorActual,$scope.mes,$scope.annio);



            }
            if(tipo==2){
                $scope.tab=2;
                $scope.tipoAsignacion="Grupal";

                getObjetivoGerenteGrupo($scope.grupoActual);
                getAvanceActividades("grupo",$scope.grupoActual.user,$scope.mes,$scope.annio);
                getAvanceContactos("grupo",$scope.grupoActual.user,$scope.mes,$scope.annio);
                getAvanceTotalesVenta("grupo",$scope.grupoActual.user,$scope.mes,$scope.annio);
                getAvanceNegociosGanados("grupo",$scope.grupoActual.user,$scope.mes,$scope.annio);
                getAvanceActividadesTipo("grupo",$scope.grupoActual,$scope.mes,$scope.annio);


            }
            if(tipo==3){
                $scope.tab=3;
                $scope.tipoAsignacion="Individual";

                getObjetivosGerenteVendedor($scope.vendedorActual);
                getAvanceActividades("vendedor",$scope.vendedorActual.user,$scope.mes,$scope.annio);
                getAvanceContactos("vendedor",$scope.vendedorActual.user,$scope.mes,$scope.annio);
                getAvanceTotalesVenta("vendedor",$scope.vendedorActual.user,$scope.mes,$scope.annio);
                getAvanceNegociosGanados("vendedor",$scope.vendedorActual.user,$scope.mes,$scope.annio);
                getAvanceActividadesTipo("vendedor",$scope.vendedorActual,$scope.mes,$scope.annio);



            }
                
                };











        }
})();           