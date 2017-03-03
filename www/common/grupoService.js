angular.module('app')

	.factory('grupoService',['$http','$q','$rootScope',function($http,$q,$rootScope){
		return{
			getGrupos:function(idgerente){
				return $http({
					url:'php/grupo/getGrupos.php',
					method:'PUT',
					data:{idgerente:idgerente},

				     headers: {'Content-Type': 'application/json'}
                })
                    .then(function(data){
                        return data.data;
                    }, function(data){
                        return $q.reject(data.data);
                    });
            },

            getInfGrupo:function(grupo){
				return $http({
					url:'php/grupo/getInfGrupo.php',
					method:'PUT',
					data: {idGrupo:grupo.idGrupo},
				     headers: {'Content-Type': 'application/json'}
                })
                    .then(function(data){
                        return data.data;
                    }, function(data){
                        return $q.reject(data.data);
                    });
            },

            getGrupoVendedor:function(idvendedor){
                return $http({
                    url:'php/grupo/getGrupoVendedor.php',
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

            agregarGrupo: function(grupo){
            	console.log(grupo);
            	return $http({
					url:'php/grupo/agregarGrupo.php',
					method:'PUT',
					data: {nombre:grupo.nombre,descripcion:grupo.descripcion,idGerente:grupo.idGerente},
				     headers: {'Content-Type': 'application/json'}
                })
                    .then(function(data){
                        return data.data;
                    }, function(data){
                        return $q.reject(data.data);
                    });
            },

            modificarGrupo: function(grupo){
            	console.log(grupo);
				return $http({
					url:'php/grupo/modificarGrupo.php',
					method:'PUT',
					data: {idGrupo:grupo.idGrupo,nombre:grupo.nombre,descripcion:grupo.descripcion},
				     headers: {'Content-Type': 'application/json'}
                })
                    .then(function(data){
                        return data.data;
                    }, function(data){
                        return $q.reject(data.data);
                    });


            },
            borrarGrupo: function(grupo){
            	console.log(grupo);
				return $http({
					url:'php/grupo/borrarGrupo.php',
					method:'PUT',
					data: {idGrupo:grupo.idGrupo},
				     headers: {'Content-Type': 'application/json'}
                })
                    .then(function(data){
                        return data.data;
                    }, function(data){
                        return $q.reject(data.data);
                    });




            },

            getVendedores: function(grupo){
            	console.log(grupo);
            	return $http({
					url:'php/grupo/getVendedoresGrupo.php',
					method:'PUT',
					data: {idGrupo:grupo.idGrupo},
				     headers: {'Content-Type': 'application/json'}
                })
                    .then(function(data){
                        return data.data;
                    }, function(data){
                        return $q.reject(data.data);
                    });
            },


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


             getVendedoresSinGrupo: function(){
            	return $http({
					url:'php/grupo/getVendedores.php',
					method:'GET',
				     headers: {'Content-Type': 'application/json'}
                })
                    .then(function(data){
                        return data.data;
                    }, function(data){
                        return $q.reject(data.data);
                    });
            },



            borrarVendedor:function(vendedor){
            	console.log(vendedor);
				return $http({
					url:'php/grupo/borrarVendedor.php',
					method:'PUT',
					data: {user:vendedor.user},
				     headers: {'Content-Type': 'application/json'}
                })
                    .then(function(data){
                        return data.data;
                    }, function(data){
                        return $q.reject(data.data);
                    });
            },
            agregarVendedor: function(vendedor,grupo){
            	console.log(vendedor);
				return $http({
					url:'php/grupo/agregarVendedor.php',
					method:'PUT',
					data: {user:vendedor.user,idGrupo:grupo.idGrupo},
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

