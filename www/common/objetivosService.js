angular.module('app')

	.factory('objetivosService',['$http','$q','$rootScope',function($http,$q,$rootScope){
		return{
			getObjetivoGerenteVendedor:function(idgerente,idvendedor,mes,annio){
                console.log(idgerente);
                console.log(idvendedor);
				return $http({
					url:'php/objetivos/getObjetivosGerenteVendedor.php',
					method:'PUT',
                    data:{idgerente:idgerente,idvendedor:idvendedor,mes:mes,annio:annio},
				     headers: {'Content-Type': 'application/json'}
                })
                    .then(function(data){
                        return data.data;
                    }, function(data){
                        return $q.reject(data.data);
                    });
            },

            


            getObjetivoGerenteGrupo:function(idgerente,idgrupo,mes,annio){
                console.log("33333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333");
                console.log(idgrupo);
                    return $http({
                    url:'php/objetivos/getObjetivosGerenteGrupo.php',
                    method:'PUT',
                    data:{idgerente:idgerente,idgrupo:idgrupo,mes:mes,annio:annio},
                     headers: {'Content-Type': 'application/json'}
                })
                    .then(function(data){
                        return data.data;
                    }, function(data){
                        return $q.reject(data.data);
                    });

            },

            getObjetivosVendedor:function(idvendedor,mes,annio){
                    return $http({
                    url:'php/objetivos/getObjetivosGerente.php',
                    method:'PUT',
                    data:{idvendedor:idvendedor,mes:mes,annio:annio},
                     headers: {'Content-Type': 'application/json'}
                })
                    .then(function(data){
                        return data.data;
                    }, function(data){
                        return $q.reject(data.data);
                    });

            },
            agregarObjetivo:function(tipo,idgerente,idtipo,objetivo){
                console.log("agreando objjjjj");                

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


                    return $http({
                    url:'php/objetivos/agregarObjetivo.php',
                    method:'PUT',
                    data:{tipo:tipo,idgerente:idgerente,idtipo:idtipo,tipoObjetivo:objetivo.tipo,fechaInicio:objetivo.fechaInicio,fechaTerminacion:objetivo.fechaTerminacion,
                        cantidad: objetivo.cantidad, anotaciones: objetivo.anotaciones, fechaRegistro:today
                    },
                     headers: {'Content-Type': 'application/json'}
                     })
                    .then(function(data){
                        return data.data;
                    }, function(data){
                        return $q.reject(data.data);
                    });


            },
            verificarObjetivo:function(tipo,idgerente,idtipo,objetivo){
                  return $http({
                    url:'php/objetivos/verificarObjetivo.php',
                    method:'PUT',
                    data:{tipo:tipo,idgerente:idgerente,idtipo:idtipo,tipoObjetivo:objetivo.tipo,fechaInicio:objetivo.fechaInicio,fechaTerminacion:objetivo.fechaTerminacion,
                        cantidad: objetivo.cantidad, anotaciones: objetivo.anotaciones
                    },
                     headers: {'Content-Type': 'application/json'}
                     })
                    .then(function(data){
                        return data.data;
                    }, function(data){
                        return $q.reject(data.data);
                    });


            },

            getAvanceActividades:function(tipo,idtipo,mes,annio){
                return $http({
                    url:'php/objetivos/getAvanceActividades.php',
                    method:'PUT',
                    data:{tipo:tipo,idtipo:idtipo,mes:mes,annio:annio
                    },
                     headers: {'Content-Type': 'application/json'}

                     })
                    .then(function(data){
                        console.log(data);
                        return data.data;
                    }, function(data){
                        return $q.reject(data.data);
                    });



            },




            getAvanceContactos:function(tipo,idtipo,mes,annio){
                console.log(idtipo);
                    return $http({
                    url:'php/objetivos/getAvanceContactos.php',
                    method:'PUT',
                    data:{tipo:tipo,idtipo:idtipo,mes:mes,annio:annio
                    },
                     headers: {'Content-Type': 'application/json'}
                     })
                    .then(function(data){
                        console.log(data);
                        return data.data;
                    }, function(data){
                        return $q.reject(data.data);
                    });


            },
            getAvanceActividadesTipo:function(tipo,idtipo,mes,annio){
                    return $http({
                    url:'php/objetivos/getAvanceActividadesTipo.php',
                    method:'PUT',
                    data:{tipo:tipo,idtipo:idtipo,mes:mes,annio:annio
                    },
                     headers: {'Content-Type': 'application/json'}
                     })
                    .then(function(data){
                        console.log(data.data);
                        return data.data;
                    }, function(data){
                        return $q.reject(data.data);
                    });


            },

            getAvanceTotalesVenta:function(tipo,idtipo,mes,annio){
                    return $http({
                    url:'php/objetivos/getAvanceTotalesVenta.php',
                    method:'PUT',
                    data:{tipo:tipo,idtipo:idtipo,mes:mes,annio:annio
                    },
                     headers: {'Content-Type': 'application/json'}
                     })
                    .then(function(data){
                        console.log(data);
                        return data.data;
                    }, function(data){
                        return $q.reject(data.data);
                    });


            },
            getAvanceNegociosGanados:function(tipo,idtipo,mes,annio){
                    return $http({
                    url:'php/objetivos/getAvanceNegociosGanados.php',
                    method:'PUT',
                    data:{tipo:tipo,idtipo:idtipo,mes:mes,annio:annio
                    },
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