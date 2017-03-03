app.controller('ventasConcretadasController', function($scope,$timeout,$http,$state){

  $http.get("php/checarSesion.php").success(function(data){
      $scope.sesion=data;
      console.log("sesion");
      console.log($scope.sesion);
      if($scope.sesion=="false")
      {
         //  $("contenidoAmostrar").hide();
          document.getElementById('contenidoAmostrar1').style.display = 'none';
          console.log("falsse");
         $state.go('login');
      }
      else
      {
      	console.log(" si hay sesion ventas concretadas");
        document.getElementById('contenidoAmostrar1').style.display = 'block';
        console.log("truee");
        console.log($scope.sesion);
        //se llena el arreglo de ventas para incluir en el ciclo de ventas
          $scope.ventas=[];
          console.log($scope.sesion);
          $scope.idvendedor=$scope.sesion;

          $scope.ventasConcretadas=[];
          $http.post("php/getVentasConcretadas.php",$scope.sesion).success(function(data){
	          $scope.ventasConcretadas=data;
	          console.log("ventasConcretadas");
	          console.log(data);
	      }).error(function(){
	              alert("an unexpected error ocurred")
	      });
        
		}

      }).error(function(){
              alert("an unexpected error ocurred")
      });

	
	
       

})