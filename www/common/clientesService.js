angular.module('app')

    .factory('clientesService', ['$http', '$q', '$rootScope', function($http, $q,$rootScope){
        return {
            getClientes: function(idvendedor){
                return $http({
                    url: 'php/clientes/getClientes.php',
                    method: "PUT",
                    data:{idvendedor:idvendedor},
                    headers: {'Content-Type': 'application/json'}
                })
                    .then(function(data){
                        return data.data;
                    }, function(data){
                        return $q.reject(data.data);
                    });
            },

           
            insertCliente: function(cliente){
                console.log("insertando");
                console.log(cliente);

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
                    url: 'php/clientes/insertarCliente.php',
                    method: "PUT",
                    data: {idContacto: cliente.idContacto, nombreContacto:cliente.nombreContacto, puesto:cliente.puesto,empresa:cliente.empresa, telefono: cliente.telefono,
                            celular: cliente.celular,correo:cliente.correo,fechaNacimiento:cliente.fechaNacimiento,anotaciones:cliente.anotaciones,imagen:cliente.imagen,
                            hobbies:cliente.hobbies,preferencias:cliente.preferencias,estadoCivil:cliente.estadoCivil,personalidad:cliente.personalidad, idvendedor:cliente.idvendedor,
                            domicilio: cliente.domicilio, nombreSecretaria:cliente.nombreSecretaria,telefonoSecretaria:cliente.telefonoSecretaria ,fechaRegistro:today},
                    headers: {'Content-Type': 'application/json'}
                })
                    .then(function(data){
                        return data.data;
                    }, function(data){
                        return $q.reject(data.data);
                    });
            },
          
           updateCliente: function(cliente){
            console.log(cliente);
                return $http({
                    url: 'php/clientes/actualizarCliente.php',
                    method: "PUT",
                    data: {idContacto: cliente.idContacto, nombreContacto:cliente.nombreContacto, puesto:cliente.puesto,empresa:cliente.empresa, telefono: cliente.telefono,
                            celular: cliente.celular,correo:cliente.correo,fechaNacimiento:cliente.fechaNacimiento,anotaciones:cliente.anotaciones,imagen:cliente.imagen,
                            hobbies:cliente.hobbies,preferencias:cliente.preferencias,estadoCivil:cliente.estadoCivil,personalidad:cliente.personalidad,domicilio:cliente.domicilio,nombreSecretaria:cliente.nombreSecretaria,telefonoSecretaria:cliente.telefonoSecretaria},
                    headers: {'Content-Type': 'application/json'}
                })
                    .then(function(data){
                        return data.data;
                    }, function(data){
                        return $q.reject(data.data);
                    });
            },
          
            deleteCliente: function(clienteid){
                return $http({
                    url: 'php/clientes/borrarCliente.php',
                    method: "PUT",
                    data:{idContacto:clienteid},
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