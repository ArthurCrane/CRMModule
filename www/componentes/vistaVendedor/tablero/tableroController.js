
(function() {

    angular.module('app').controller('tableroController', tableroController);

    tableroController.$inject = ['$scope','$rootScope','tableroService','estadisticasService','$http','$state','perfilService'];

    function tableroController($scope,$rootScope,tableroService,estadisticasService, $http,$state,perfilService){
        $scope.totalNegociosGanados="";
        $scope.totalNegociosEnCurso="";
        $scope.actividadesProximas=[];
        $scope.actividadesRecientes=[];
        $scope.ventasRecientes=[];
        $scope.topcontactos=[];
        $scope.reciente=[];

        $scope.tipoPagVenta=tipoPagVenta;

    	activate();



    	function activate(){
    		console.log("tableroooooo");
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

                                    getIndicadores();
                                    getActividadesProximas();
                                    getObjetivosProximos();
                                    getActividadesRecientes();
                                    getVentasRecientes();
                                    getTopContactos();
                                    getEstadistica();


                            }, function(data){
                                        console.log("Error:"+data);     
                            })



                       }
            });

        };


    	function getIndicadores(){
            console.log($rootScope.usuario);
            tableroService.getTotalNegociosGanados($rootScope.user)
                .then(function(data){
                    $scope.totalNegociosGanados=data[0].cont; 
                    console.log(data);    
                    console.log($scope.totalNegociosGanados);                  
          
                }, function(data){
                    console.log("Error:"+data);      
                })

            tableroService.getTotalNegociosEnCurso($rootScope.user)
                  .then(function(data){
                    $scope.totalNegociosEnCurso=data[0].cont; 
                    console.log(data);                      
          
                }, function(data){
                    console.log("Error:"+data);      
                })
    	};
        function getTopContactos(){
              tableroService.getTopContactos($rootScope.user)
                          .then(function(data){
                                $scope.topcontactos=data; 
                                console.log(data);    
                                console.log($scope.topcontactos);                  
                      
                            }, function(data){
                                console.log("Error:"+data);      
                            })
        };


        function getActividadesRecientes(){
            console.log("Actividades Recientesssssssssssssssssssssssssssssssssss");
                tableroService.getActividadesRecientes($rootScope.user)
                  .then(function(data){
                        $scope.actividadesRecientes=data; 
                        console.log(data);    
                        console.log($scope.actividadesRecientes);                  
              
                    }, function(data){
                        console.log("Error:"+data);      
                    })


        };


        function getVentasRecientes(){
            console.log("Ventas Recientes");
                    tableroService.getVentasRecientes($rootScope.user)
                      .then(function(data){
                            $scope.ventasRecientes=data; 
                            console.log(data);    
                            console.log($scope.ventasRecientes);   
                            console.log("Ventas Recientes**************************************************************************************"); 


                var cont=0;
                $scope.reciente=[];
                for(i=0;i<$scope.ventasRecientes.length;i++){
                    var r={fecha:$scope.ventasRecientes[i].fecha,
                        titulo:'Venta '+$scope.ventasRecientes[i].status,
                        contacto:$scope.ventasRecientes[i].contacto,
                        venta:$scope.ventasRecientes[i].nombre,
                         mensaje: "Total Obtenido : $"+$scope.ventasRecientes[i].total};              
                    $scope.reciente[cont]=r;
                    console.log($scope.reciente[cont]);
                    cont=cont+1;
                }    
            /**
                  for(i=0;i<$scope.actividadesRecientes.length;i++){
                    var r={fecha: $scope.actividadesRecientes[i].fecha, 
                        titulo: $scope.actividadesRecientes[i].tipo,
                        contacto:'Contacto:'+ $scope.actividadesRecientes[i].contacto,
                        venta:'Nombre Venta:'+ $scope.actividadesRecientes[i].nombre, 
                        mensaje:'Anotaciones:'+$scope.actividadesRecientes[i].anotaciones };
                        console.log(cont);
                                        console.log($scope.reciente[cont]);

                    $scope.reciente[cont]=r;
                    cont=cont+1;
                }    
                */
                console.log("Reciente");
                console.log($scope.reciente);

                var aux=$scope.reciente;
                var cont=0;

                for(i=0;i<$scope.reciente.length;i++){
                    console.log($scope.reciente[i]);
                    for(j=0;j<$scope.reciente.length-1;j++){
                        console.log($scope.reciente[j]);
                         if($scope.reciente[j].fecha<$scope.reciente[j+1].fecha){
                            aux=$scope.reciente[i];
                            $scope.reciente[j]=$scope.reciente[j+1];
                            $scope.reciente[j+1]=aux;

                        }
                    }
                   
                }
                console.log($scope.reciente);


                            

                  
                        }, function(data){
                            console.log("Error:"+data);      
                        })

        };

        function getEstadistica(){

                //TOTALES DE VENTAS
             estadisticasService.getTotalesVenta('vendedor',$rootScope.user ,0,2016)
                .then(function(data){
                    $scope.estadisticasTotalesVenta=data; 
                    console.log($scope.estadisticasTotalesVenta);
                    console.log($scope.estadisticasTotalesVenta);   
                    $scope.labels=[];

                   
                        $scope.labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
                   
                  
                
                    
                //  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
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




        };


        function getActividadesProximas(){  
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

            tableroService.getActividadesProximas($rootScope.user,today)
              .then(function(data){
                    $scope.actividadesProximas=data; 
                    console.log(data);    
                    console.log($scope.actividadesProximas);                  
                    $scope.totalActividadesProximas=data.length;
                    var dias = new Array('Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo');
                    
                    for(i=0;i<$scope.actividadesProximas.length;i++){
                        var fecha=new Date($scope.actividadesProximas[i].fecha);
                        var dia=fecha.getDay();
                        $scope.actividadesProximas[i].dia=dias[dia];
                    }
                        console.log($scope.actividadesProximas);                  


                }, function(data){
                    console.log("Error:"+data);      
                })

        };

        function getObjetivosProximos(){  
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

            tableroService.getObjetivosProximos($rootScope.user,today)
              .then(function(data){
                    $scope.getObjetivosProximos=data; 
                    console.log(data);    
                    console.log($scope.getObjetivosProximos);                  
                    $scope.totalObjetivosProximos=data.length;

                }, function(data){
                    console.log("Error:"+data);      
                })

        };

        function tipoPagVenta(actividad){
          $rootScope.comeFromNotificaciones=true;
          $rootScope.notificacion=actividad;
        };




    

    

    }

})();
