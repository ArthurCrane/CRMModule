angular.module('app')

    .factory('configuracionService', ['$http', '$q', '$rootScope', function($http, $q,$rootScope){
        return {
            getConfiguracionProductos: function(idusuario){
                return $http({
                    url: 'php/configuracion/getConfiguracionProductos.php',
                    method: "PUT",
                    data: {idusuario: idusuario},
                    headers: {'Content-Type': 'application/json'}
                })
                    .then(function(data){
                        return data.data;
                    }, function(data){
                        return $q.reject(data.data);
                    });
            },
          
            setConfiguracionProductos: function(configvars){
                console.log(configvars);
                return $http({
                    url: 'php/configuracion/setConfiguracionProductos.php',
                    method: "PUT",
                    data: { idusuario: configvars.idusuario, propiedades: configvars.propiedades, existencias: configvars.existencias,imagen:configvars.imagen},
                    headers: {'Content-Type': 'application/json'}
                })
                    .then(function(data){
                        return data.data;
                    }, function(data){
                        return $q.reject(data.data);
                    });
            },

            getConfiguracionClientes: function(idusuario){
                return $http({
                    url: 'php/configuracion/getConfiguracionClientes.php',
                    method: "PUT",
                    data: {idusuario: idusuario},
                    headers: {'Content-Type': 'application/json'}
                })
                    .then(function(data){
                        return data.data;
                    }, function(data){
                        return $q.reject(data.data);
                    });
            },
          
            setConfiguracionClientes: function(configvars){
                console.log(configvars);
                return $http({
                    url: 'php/configuracion/setConfiguracionClientes.php',
                    method: "PUT",
                    data: { idusuario: configvars.idusuario, puesto: configvars.puesto, domicilio: configvars.domicilio, telefonoOficina: configvars.telefonoOficina,
                    anotaciones: configvars.anotaciones,estadoCivil:configvars.estadoCivil, nombreSecretaria: configvars.nombreSecretaria, telefonoSecretaria: configvars.telefonoSecretaria,
                    hobbies:configvars.hobbies,  preferencias: configvars.preferencias,  personalidad: configvars.personalidad},
                    headers: {'Content-Type': 'application/json'}
                })
                    .then(function(data){
                        return data.data;
                    }, function(data){
                        return $q.reject(data.data);
                    });
            },
            getConfiguracionVenta: function(idusuario){
                 return $http({
                                url: 'php/configuracion/getConfiguracionVenta.php',
                                method: "PUT",
                                data: {idusuario: idusuario},
                                headers: {'Content-Type': 'application/json'}
                            })
                                .then(function(data){
                                    return data.data;
                                }, function(data){
                                    return $q.reject(data.data);
                                });
            },

            setConfiguracionVenta: function(configvars){
                console.log(configvars);
                    return $http({
                        url: 'php/configuracion/setConfiguracionVenta.php',
                        method: "PUT",
                        data: { idusuario: configvars.idusuario, descuento: configvars.descuento},
                        headers: {'Content-Type': 'application/json'}
                    })
                        .then(function(data){
                            return data.data;
                        }, function(data){
                            return $q.reject(data.data);
                        });
            },

            getConfiguracionUsuario: function(idusuario){
                 return $http({
                                url: 'php/configuracion/getConfiguracionUsuario.php',
                                method: "PUT",
                                data: {idusuario: idusuario},
                                headers: {'Content-Type': 'application/json'}
                            })
                                .then(function(data){
                                    return data.data;
                                }, function(data){
                                    return $q.reject(data.data);
                                });
            },

            setConfiguracionUsuario: function(configvars){
                console.log(configvars);
                    return $http({
                        url: 'php/configuracion/setConfiguracionUsuario.php',
                        method: "PUT",
                        data: { idusuario: configvars.idusuario, imagen: configvars.imagen, fechaNacimiento: configvars.fechaNacimiento},
                        headers: {'Content-Type': 'application/json'}
                    })
                        .then(function(data){
                            return data.data;
                        }, function(data){
                            return $q.reject(data.data);
                        });
            },

            getConfiguracionActividad:function(idusuario){
                    return $http({
                        url: 'php/configuracion/getConfiguracionActividad.php',
                        method: "PUT",
                        data: { idusuario: idusuario},
                        headers: {'Content-Type': 'application/json'}
                    })
                        .then(function(data){
                            return data.data;
                        }, function(data){
                            return $q.reject(data.data);
                        });



            },




        };
    }]);