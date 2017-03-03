(function() {

    angular.module('app').controller('grupoController', grupoController);

    grupoController.$inject = ['$scope','$rootScope','$stateParams','grupoService','validationService','$state'];

    /* @ngInject */


    function grupoController($scope,$rootScope, $stateParams,grupoService,validationService,$state){
        $scope.grupoParams=$stateParams;
        $scope.grupo={};   
        $scope.vendedores={};
        $scope.checkTodos=false;
        $scope.checkTodos=false;
        $scope.grupoAModificar={};


        activate();
       
        $scope.modificarGrupo=modificarGrupo;        
        $scope.borrarGrupo=borrarGrupo;

        $scope.borrarVendedores=borrarVendedores;
        $scope.agregarVendedores=agregarVendedores;

        $scope.setGrupoAModificar=setGrupoAModificar;
        $scope.seleccionarTodos=seleccionarTodos;
        $scope.seleccionarTodos2=seleccionarTodos2;

    	function activate(){
            getInfGrupo();

            getVendedores();
            getVendedoresSinGrupo();


    	};

        function getInfGrupo(){
             grupoService.getInfGrupo($scope.grupoParams)
                .then(function(data){
                    $scope.grupo=data  [0]; 
                    console.log($scope.grupo);   
                     console.log($scope.nombre);             
          
                }, function(data){
                    console.log("Error:"+data[0]);      
                })
        };

        function setGrupoAModificar(){
            console.log("setting");
            console.log($scope.grupo);
            $scope.grupoAModificar.nombre=$scope.grupo.nombre;
            $scope.grupoAModificar.descripcion=$scope.grupo.descripcion;
            $scope.grupoAModificar.idGrupo=$scope.grupo.idGrupo;
            $scope.grupoAModificar.idGerente=$scope.grupo.idGerente;
        };


        function modificarGrupo(){
        
            grupoService.modificarGrupo($scope.grupoAModificar)
              .then(function(data){
                    //$scope.grupo=data  [0]; 
                  console.log($scope.grupo);   
                    // console.log($scope.nombre);      
                    $("[data-dismiss=modal]").trigger({ type: "click" });
                    $scope.grupo.nombre=$scope.grupoAModificar.nombre;
                    $scope.grupo.descripcion=$scope.grupoAModificar.descripcion;
                    toastr.success("Grupo Modificado Correctamente!");

                              
                }, function(data){
                    console.log("Error:"+data[0]);   
                    toastr.warning("Error al modificar");
   
                })

        };

        function borrarGrupo(){
            console.log("borrando");
            grupoService.borrarGrupo($scope.grupo)
            .then(function(data){
                    //$scope.grupo=data  [0]; 
                    // console.log($scope.nombre);      
                    $("[data-dismiss=modal]").trigger({ type: "click" });
                    toastr.success("Grupo Borrado Correctamente!");
                    $state.go('grupos');


                              
                }, function(data){
                    console.log("Error:"+data[0]);      
                })



        };

        function getVendedores(){
            console.log($scope.grupo);
            grupoService.getVendedores($scope.grupoParams)
                .then(function(data){
                    $scope.vendedores=data || [];
                    console.log($scope.vendedores);      
                    for(var i=0;i<$scope.vendedores.length;i++){
                        $scope.vendedores[i].isSelected=false;
                    }
                    console.log($scope.vendedores);

                }, function(data){
                            console.log("Error:"+data[0]);      
                })

        };


        function getVendedoresSinGrupo(){

            grupoService.getVendedoresSinGrupo()
                .then(function(data){
                    $scope.vendedoresSinGrupo=data || [];
                    console.log($scope.vendedoresSinGrupo);  
                      for(var i=0;i<$scope.vendedoresSinGrupo.length;i++){
                        $scope.vendedoresSinGrupo[i].isSelected=false;
                    }   
                   

                }, function(data){
                            console.log("Error:"+data[0]);      
                })

        };



        function seleccionarTodos(){
            console.log("checkbox");

            if($scope.checkTodos){
                for(var i=0;i<$scope.vendedores.length;i++)
                        $scope.vendedores[i].isSelected=true;
                    

            }else{
                for(var i=0;i<$scope.vendedores.length;i++)
                        $scope.vendedores[i].isSelected=false;
                    

            }
        }; 	
          function seleccionarTodos2(){
            console.log("checkbox");
            if($scope.checkTodos2){
                for(var i=0;i<$scope.vendedoresSinGrupo.length;i++)
                        $scope.vendedoresSinGrupo[i].isSelected=true;                 

            }else{
                for(var i=0;i<$scope.vendedoresSinGrupo.length;i++)
                        $scope.vendedoresSinGrupo[i].isSelected=false;
                    

            }
        };  

        function agregarVendedores(){
             console.log($scope.vendedoresSinGrupo);
            for(var i=0;i<$scope.vendedoresSinGrupo.length;i++){

                if($scope.vendedoresSinGrupo[i].isSelected){ 
                    console.log($scope.vendedoresSinGrupo[i]); 
                    grupoService.agregarVendedor($scope.vendedoresSinGrupo[i],$scope.grupo)
                    .then(function(data){
                        console.log("ha agregado");
                           // var index = $scope.vendedores.indexOf(vendedor);
                            //console.log(index);
                             //$scope.vendedores.splice(index, 1);  
                             //i=i-1; 
                        $("[data-dismiss=modal]").trigger({ type: "click" });
                                            toastr.success("Vendedores Agregados Correctamente!");


                    }, function(data){
                                console.log("Error:"+data[0]);  
                                                    toastr.warning("Error al Agregar Vendedores");
    
                    })

                }//if
            }//for
                            location.reload(true);

                 

        };


        function borrarVendedores(){
            console.log("borrando...");
            console.log($scope.vendedores);
            for(var i=0;i<$scope.vendedores.length;i++){

                if($scope.vendedores[i].isSelected){ 
                    console.log($scope.vendedores[i]); 
                    grupoService.borrarVendedor($scope.vendedores[i])
                    .then(function(data){
                        console.log("ha borrado");
                           // var index = $scope.vendedores.indexOf(vendedor);
                            //console.log(index);
                             //$scope.vendedores.splice(index, 1);  
                             //i=i-1; 
                                                 toastr.success("Vendedores Borrados Correctamente!");

                    }, function(data){
                                console.log("Error:"+data[0]);  
                                                    toastr.warning("Error al borrar Vendedores ");
    
                    })

                }//if
            }//for
                 

                location.reload(true);
        }; //function borrarVendedores}

    	

    }



  })();