app.controller('ventasConcretadasController', function($scope,$timeout,$http,$state){

          $scope.ventasConcretadas=[];
          $http.post("php/getVentasConcretadas.php",$scope.sesion).success(function(data){
          $scope.ventasConcretadas=data;
          console.log(data);
          for(var i=0;i<$scope.ventasConcretadas.length;i++)
          {
             for(var j=0;j<$scope.productos.length;j++)
            {
              if($scope.productos[j].idProducto == $scope.ventasConcretadas[i].idproducto)  
               
                $scope.ventasConcretadas[i].producto=$scope.productos[j].nombreProducto;
              
            }

           for(var j=0;j<$scope.contactos.length;j++)
              {
                if($scope.contactos[j].idContacto == $scope.ventasConcretadas[i].idcontacto)  
                 
                  $scope.ventasConcretadas[i].contacto=$scope.contactos[j].nombreContacto;
                
              }    
           
          }


            }).error(function(){
              alert("an unexpected error ocurred")
            });



       }

});