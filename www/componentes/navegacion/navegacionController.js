
(function() {

    angular.module('app').controller('navegacionController', navegacionController);

    navegacionController.$inject=['$scope','$rootScope','$http','$state','perfilService'];

    function navegacionController($scope,$rootScope,$http,$state,perfilService){
    	$rootScope.notificaciones=[];
    	$rootScope.user="";
    	$rootScope.tipoUsuario="";
    	

    	activate();

    	$scope.cerrarSession=cerrarSession;
    	$scope.tipoPagVenta=tipoPagVenta;
    	$rootScope.getNotificaciones=getNotificaciones;


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

					  	getNotificaciones();
					  }
					});

    	};

    	function getNotificaciones(){
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
			  //  var today = dd+'/'+mm+'/'+yyyy;
			    console.log("dia");
			    console.log(today);
			    $rootScope.user=$scope.sesion;

			    console.log("vendedor");
			    console.log($scope.vendedor);
			    /* SE TOMAN LAS NOTIFICACIONES DE ACTIVIDADES PROXIMAS DE LA BD*/
			     $http.post("php/getNotificaciones.php", {idvendedor:$rootScope.user,diaActual: today}).success(function(data,status,headers,config){
			                    console.log("Notificaciones");
			                    console.log(data);
			                    $rootScope.notificaciones=data;
			                    $rootScope.contador=$scope.notificaciones.length;
			                    console.log("CONTADOR");
			                    console.log($scope.contador);
			                })


			     			//sacar los cumpleaños
			    $http.post("php/getNotificacionesCumpleanios.php", {idvendedor:$rootScope.user,diaActual: today}).success(function(data,status,headers,config){
			                    console.log(data);
			                    $rootScope.notificacionesCumpleanios=data;
			                 //   $rootScope.contador=$scope.notificaciones.length;
			                })


			     $http.post("php/getNotificacionesObjetivos.php", {idvendedor:$rootScope.user,diaActual: today}).success(function(data,status,headers,config){
			                    console.log(data);
			                    $rootScope.notificacionesObjetivos=data;

			                 //   $rootScope.contador=$scope.notificaciones.length;
			                })






    	};




    	function cerrarSession(){
    			$http.put('php/cerrarSession.php').success(function(data){
						console.log(data);
						if(data==0){
							console.log("dentro");
							$state.go("login");
						}

			});

    	};

    	function tipoPagVenta(notificacion){
    	  $rootScope.comeFromNotificaciones=true;
		  $rootScope.notificacion=notificacion;
		  console.log(notificacion);
    	};






    }


})();