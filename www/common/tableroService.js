angular.module('app')

	.factory('tableroService',['$http','$q','$rootScope',function($http,$q,$rootScope){
		return{
			getTotalNegociosGanados:function(idvendedor){
				console.log(idvendedor);
				return $http({
					url:'php/tablero/getTotalNegociosGanados.php',
					method:'PUT',
                    data:{idvendedor:idvendedor},
				     headers: {'Content-Type': 'application/json'}
                })
                    .then(function(data){
                    	console.log(data);
                        return data.data;
                    }, function(data){
                        return $q.reject(data.data);
                    });


			},
			getTotalNegociosEnCurso:function(idvendedor){
				console.log(idvendedor);
				return $http({
						url:'php/tablero/getTotalNegociosEnCurso.php',
						method:'PUT',
	                    data:{idvendedor:idvendedor},
					     headers: {'Content-Type': 'application/json'}
	                })
	                    .then(function(data){
	                    	console.log(data);
	                        return data.data;
	                    }, function(data){
	                        return $q.reject(data.data);
	                    });




			},
			getObjetivosProximos:function(idvendedor,today){
				return $http({
						url:'php/tablero/getObjetivosProximos.php',
						method:'PUT',
	                    data:{idvendedor:idvendedor,diaActual:today},
					     headers: {'Content-Type': 'application/json'}
	                })
	                    .then(function(data){
	                    	console.log(data);
	                        return data.data;
	                    }, function(data){
	                        return $q.reject(data.data);
	                    });

			},
	
			getActividadesProximas:function(idvendedor,today){
				console.log(idvendedor);
					return $http({
							url:'php/tablero/getActividadesProximas.php',
							method:'PUT',
		                    data:{idvendedor:idvendedor,diaActual:today},
						     headers: {'Content-Type': 'application/json'}
		                })
		                    .then(function(data){
		                    	console.log(data);
		                        return data.data;
		                    }, function(data){
		                        return $q.reject(data.data);
		                    });



			},

			getActividadesRecientes:function(idvendedor){
					return $http({
							url:'php/tablero/getActividadesRecientes.php',
							method:'PUT',
		                    data:{idvendedor:idvendedor},
						     headers: {'Content-Type': 'application/json'}
		                })
		                    .then(function(data){
		                    	console.log(data);
		                        return data.data;
		                    }, function(data){
		                        return $q.reject(data.data);
		                    });




			},

			getVentasRecientes:function(idvendedor){
					return $http({
							url:'php/tablero/getVentasRecientes.php',
							method:'PUT',
		                    data:{idvendedor:idvendedor},
						     headers: {'Content-Type': 'application/json'}
		                })
		                    .then(function(data){
		                    	console.log(data);

		                    	
		                        return data.data;
		                    }, function(data){
		                        return $q.reject(data.data);
		                    });





			},

			getTopContactos:function(idvendedor){
					console.log(idvendedor);
					return $http({
							url:'php/tablero/getTopContactos.php',
							method:'PUT',
		                    data:{idvendedor:idvendedor},
						     headers: {'Content-Type': 'application/json'}
		                })
		                    .then(function(data){
		                    	console.log(data);
		                        return data.data;
		                    }, function(data){
		                        return $q.reject(data.data);
		                    });


			},




		};

}]);




