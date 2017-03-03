(function() {

    angular.module('app').controller('gruposController', gruposController);

    gruposController.$inject = ['$scope','$rootScope','grupoService','validationService','$http','$state','perfilService'];

    /* @ngInject */

    function gruposController($scope,$rootScope,grupoService,validationService,$http,$state,perfilService){
    	$scope.grupos=[];
    	$scope.NuevoGrupo={};
        $scope.NuevoGrupo.descripcion="";
    	activate();
    	$scope.agregarGrupo=agregarGrupo;

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
                          
                             getGrupos();                            



                      }
                    });

        };









    	function getGrupos(){
    		console.log("getting grupos");
    			grupoService.getGrupos($rootScope.user)
				.then(function(data){
					$scope.grupos=data || [];
					console.log($scope.grupos);			
				}, function(data){
							console.log("Error:"+data[0]);		
				})


    	};

    	function agregarGrupo(){
    		console.log("adding group");

    		$scope.NuevoGrupo.idGerente=$rootScope.user;
			var data=validationService.validateGrupo($scope.NuevoGrupo);

    		$scope.errores=data;
    		console.log(data.length);
    		if(data.errorNombre!=undefined||data.errorDescripcion!=undefined){
    			console.log("errores");
    			//error
    		}else{
    			//no error
    			
    		grupoService.agregarGrupo($scope.NuevoGrupo)
    			.then(function(data){
    				console.log(data);
              		$scope.grupos.push(data[0]);
   		            $("[data-dismiss=modal]").trigger({ type: "click" });



    			},function(data){
    				console.log("Error:"+data[0]);
    			})


				console.log("no errores");
    		}


    	};

    }



  })();