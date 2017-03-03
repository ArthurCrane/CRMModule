angular.module('app')

	.factory('asignacionesService',['$http','$q','$rootScope',function($http,$q,$rootScope){
		return{

            getVendedoresGerente: function(idgerente){
                console.log(idgerente);
                return $http({
                    url:'php/grupo/getVendedoresGerente.php',
                    method:'PUT',
                    data: {idgerente:idgerente},
                     headers: {'Content-Type': 'application/json'}
                })
                    .then(function(data){
                        return data.data;
                    }, function(data){
                        return $q.reject(data.data);
                    });
            },

            getContactosVendedor:function(idvendedor){
            	return $http({
                    url:'php/asignaciones/getContactosVendedor.php',
                    method:'PUT',
                    data: {idvendedor:idvendedor},
                     headers: {'Content-Type': 'application/json'}
                })
                    .then(function(data){
                        return data.data;
                    }, function(data){
                        return $q.reject(data.data);
                    });

            },

            getNegociosVendedor:function(idvendedor){
            	return $http({
                    url:'php/asignaciones/getNegociosVendedor.php',
                    method:'PUT',
                    data: {idvendedor:idvendedor},
                     headers: {'Content-Type': 'application/json'}
                })
                    .then(function(data){
                        return data.data;
                    }, function(data){
                        return $q.reject(data.data);
                    });
            },
            asignarContactos:function(idvendedor,contactos){
  				return $http({
                    url:'php/asignaciones/asignarContactos.php',
                    method:'PUT',
                    data: {idvendedor:idvendedor,contactos:contactos},
                     headers: {'Content-Type': 'application/json'}
                })
                    .then(function(data){
                        return data.data;
                    }, function(data){
                        return $q.reject(data.data);
                    });




            },
            asignarNegocios:function(idvendedor,negocios){
  				return $http({
                    url:'php/asignaciones/asignarNegocios.php',
                    method:'PUT',
                    data: {idvendedor:idvendedor,negocios:negocios},
                     headers: {'Content-Type': 'application/json'}
                })
                    .then(function(data){
                        return data.data;
                    }, function(data){
                        return $q.reject(data.data);
                    });




            },
               reAsignarContactos:function(idcontacto,idvendedorAnterior,vendedorNuevo){
  				return $http({
                    url:'php/asignaciones/reAsignarContactos.php',
                    method:'PUT',
                    data: {idcontacto:idcontacto,idvendedorAnterior:idvendedorAnterior,vendedorNuevo:vendedorNuevo},
                     headers: {'Content-Type': 'application/json'}
                })
                    .then(function(data){
                        return data.data;
                    }, function(data){
                        return $q.reject(data.data);
                    });




            },
                reAsignarNegocio:function(idnegocio,idvendedorAnterior,vendedorNuevo){
  				return $http({
                    url:'php/asignaciones/reAsignarNegocio.php',
                    method:'PUT',
                    data: {idnegocio:idnegocio,idvendedorAnterior:idvendedorAnterior,vendedorNuevo:vendedorNuevo},
                     headers: {'Content-Type': 'application/json'}
                })
                    .then(function(data){
                        return data.data;
                    }, function(data){
                        return $q.reject(data.data);
                    });




            },














		}

	}]);

