angular.module('app')

    .factory('perfilService', ['$http', '$q', '$rootScope', function($http, $q,$rootScope){
        return {
            getUsuario: function(idvendedor){

            	  return $http({
                    url: 'php/perfil/getVendedor.php',
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
            actualizarImagen:function(idvendedor,imagen){
            	return $http({
                    url: 'php/perfil/actualizarImagen.php',
                    method: "PUT",
                    data:{idvendedor:idvendedor,imagen:imagen},
                    headers: {'Content-Type': 'application/json'}
                })
                    .then(function(data){
                        return data.data;
                    }, function(data){
                        return $q.reject(data.data);
                    });


            },

            actualizarUsuario:function(usuario){
            	  return $http({
                    url: 'php/perfil/actualizarUsuario.php',
                    method: "PUT",
                    data:{idvendedor:usuario.user,nombre: usuario.nombre, mail:usuario.mail,fechaNacimiento:usuario.fechaNacimiento},
                    headers: {'Content-Type': 'application/json'}
                })
                    .then(function(data){
                        return data.data;
                    }, function(data){
                        return $q.reject(data.data);
                    });


            },

            cambiarContrasenia: function(idvendedor,contraNueva){
            	return $http({
                    url: 'php/perfil/actualizarContrasenia.php',
                    method: "PUT",
                    data:{idvendedor:idvendedor,contrasena:contraNueva},
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