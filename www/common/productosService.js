angular.module('app')

    .factory('productosService', ['$http', '$q', '$rootScope', function($http, $q,$rootScope){
        return {
            getProductos: function(){
                return $http({
                    url: 'php/productos/getProductos.php',
                    method: "GET",
                    headers: {'Content-Type': 'application/json'}
                })
                    .then(function(data){
                        return data.data;
                    }, function(data){
                        return $q.reject(data.data);
                    });
            },

           
            insertProducto: function(producto){
                console.log(producto);
                return $http({
                    url: 'php/productos/insertarProducto.php',
                    method: "PUT",
                    data: {nombreProducto: producto.nombreProducto, precio:producto.precio, descripcion:producto.descripcion,existencias:producto.existencias, propiedades: producto.propiedades,imagen:producto.imagen},
                    headers: {'Content-Type': 'application/json'}
                })
                    .then(function(data){
                        return data.data;
                    }, function(data){
                        return $q.reject(data.data);
                    });
            },
          
            updateProducto: function(producto){
                return $http({
                    url: 'php/productos/actualizarProducto.php',
                    method: "PUT",
                    data: {idProducto: producto.idProducto, nombreProducto: producto.nombreProducto, precio:producto.precio, descripcion:producto.descripcion, propiedades: producto.propiedades,existencias: producto.existencias,imagen:producto.imagen},

                    headers: {'Content-Type': 'application/json'}
                })
                    .then(function(data){
                        return data.data;
                    }, function(data){
                        return $q.reject(data.data);
                    });
            },

            updateExistencias:function(producto){
                   return $http({
                    url: 'php/productos/actualizarExistencias.php',
                    method: "PUT",
                    data: {idProducto: producto.idProducto, existencias: producto.existencias},

                    headers: {'Content-Type': 'application/json'}
                })
                    .then(function(data){
                        return data.data;
                    }, function(data){
                        return $q.reject(data.data);
                    }); 
                },
            
            deleteProducto: function(productoid){
                return $http({
                    url: 'php/productos/borrarProducto.php',
                    method: "PUT",
                    data:{idProducto:productoid},
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