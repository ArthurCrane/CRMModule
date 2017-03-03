app.controller('estadisticasController',['$scope','$state','$stateParams','$http','$rootScope', function($scope,$state,$stateParams,$http,$rootScope){
    var meses=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    var dias= ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];
    var diasIngles= ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];


    $scope.chartObject = {};    

    $scope.chartObject.type = "ColumnChart";    
    $scope.onions = [
        {v: "Onions"},
        {v: 3},
    ];
    $scope.chartObject.data = {"cols": [
        {id: "t", label: "Topping", type: "string"},
        {id: "s", label: "$", type: "number"}
    ], "rows": [
        {c: [
            {v: "Mushrooms"},
            {v: 3},
        ]},
        {c: $scope.onions},
        {c: [
            {v: "Olives"},
            {v: 31}
        ]},
        {c: [
            {v: "Zucchini"},
            {v: 1},
        ]},
        {c: [
            {v: "Pepperoni"},
            {v: 2},
        ]}
    ]};
    $scope.chartObject.options = {
        'title': 'How Much Pizza I Ate Last Night',
        isSD:true
         // colors: ['#ACFA58'],

    };



$http.get("php/checarSesion.php").success(function(data){
      $scope.sesion=data;
      console.log("sesion");
      console.log($scope.sesion);
      if($scope.sesion=="false")
      {
         //  $("contenidoAmostrar").hide();
     //     document.getElementById('contenidoAmostrar1').style.display = 'none';
        console.log("falsse");
        $state.go('login');
      

      }
      else
      {
  //      document.getElementById('contenidoAmostrar1').style.display = 'block';
        console.log("truee");
        console.log($scope.sesion);
        $scope.idvendedor=$scope.sesion;
        console.log($scope.idvendedor);

        $scope.ventasVendedor=[];
        $scope.ventasCerradasGanadas={status:"Cerrada Ganada",cont:0,total:0};
        $scope.ventasCerradasPerdidas={status:"Cerrada Perdida",cont:0,total:0};
        $scope.ventasEnProceso={status:"En proceso",cont:0,total:0};

        console.log($scope.idvendedor);
/*Metodos para llenar la parte de año*/
        $http.post("php/getVentasVendedor.php",{'idvendedor':$scope.idvendedor,'tipo':'annio'}).success(function(data){
        $scope.ventasVendedor=data;
          console.log($scope.ventasVendedor);

                  console.log($scope.ventasCerradasPerdidas);

          for(var i=0;i<$scope.ventasVendedor.length;i++)
          {
            if($scope.ventasVendedor[i].status=="Cerrada Ganada") 
                $scope.ventasCerradasGanadas=$scope.ventasVendedor[i];
             if($scope.ventasVendedor[i].status=="Cerrada Perdida") 
                $scope.ventasCerradasPerdidas=$scope.ventasVendedor[i];
             if($scope.ventasVendedor[i].status=="En proceso") 
                $scope.ventasEnProceso=$scope.ventasVendedor[i];

          }

          console.log($scope.ventasCerradasPerdidas);


         
        }).error(function(){
            alert("an unexpected error ocurred");
        });

        $http.post("php/getActividadesMes.php",{'idvendedor':$scope.idvendedor,'tipo':'annio'}).success(function(data){
          $scope.actividadesCompletadas=data[0];
          $scope.actividadesPorCumplir=data[1]
          console.log($scope.actividadesCompletadas);

        }).error(function(){
            alert("an unexpected error ocurred");
        });

            $http.post("php/getVentasVendedorMes.php",{idvendedor:$scope.idvendedor,tipo:'annio'}).success(function(data){
                $scope.ventasporAnnio=data;
                console.log(data);
                var dataforCharVentas=[];
              var objGeneral=[];
                for (var i=1;i<=12;i++){
                    var obj=[{v:meses[i-1]},{v:0}];
                    var o={c:obj}
                    objGeneral.push(o);
                }                
                for(var j=0;j<$scope.ventasporAnnio.length;j++)
                    {var obj=[];

                            obj=[{v:meses[$scope.ventasporAnnio[j].mes-1]},{v:$scope.ventasporAnnio[j].total}];
                            console.log("encontrado en");
                            console.log(i);
                            console.log(obj);
                            var o={c:obj};
                            objGeneral[$scope.ventasporAnnio[j].mes-1]=o;                   

                 }               
                 console.log(objGeneral);                 

                    $scope.chartObject = {};    
                    $scope.chartObject.type = "ColumnChart";                  
                    $scope.chartObject.data = {"cols": [
                        {id: "t", label: "Topping", type: "string"},
                        {id: "s", label: "$", type: "number"}
                    ], "rows": objGeneral                    
                    };
                    $scope.chartObject.options = {
                        'title': 'Totales de Venta',
                        isSD:true
                    };

             }).error(function(){
                alert("an unexpected error ocurred");
            });

                $http.post("php/getNegociosGanadosMes.php",{'idvendedor':$scope.idvendedor,'tipo':'annio'}).success(function(data){
                $scope.negociosGanados=data;
                console.log(data);
                var dataforChar=[];
                var objGeneral2=[];
                for (var i=1;i<=12;i++){
                    var obj=[{v:meses[i-1]},{v:0}];
                    var o={c:obj}
                    objGeneral2.push(o);
                }                
                for(var j=0;j<$scope.negociosGanados.length;j++)
                    {var obj=[];

                            obj=[{v:meses[$scope.negociosGanados[j].mes-1]},{v:$scope.negociosGanados[j].cont}];
                            console.log("encontrado en");
                            console.log(i);
                            console.log(obj);
                            var o={c:obj};
                            objGeneral2[$scope.negociosGanados[j].mes-1]=o;                   

                 }             
                    $scope.chartObject2 = {};    
                    $scope.chartObject2.type = "ColumnChart";                  
                    $scope.chartObject2.data = {"cols": [
                        {id: "t", label: "Topping", type: "string"},
                        {id: "s", label: "# Negocios", type: "number"}
                    ], "rows": objGeneral2                    
                    };
                    $scope.chartObject2.options = {
                        'title': 'Negocios ganados',
                        isSD:true
                    };

             }).error(function(){
                alert("an unexpected error ocurred");
            });



                $http.post("php/getActividadesVendedorMes.php",{'idvendedor':$scope.idvendedor,'tipo':'annio'}).success(function(data){
                $scope.actividadesAnnio=data;
                console.log(data);
                var dataforChar=[];
                var objGeneral3=[];
                for (var i=1;i<=12;i++){
                    var obj=[{v:meses[i-1]},{v:0}];
                    var o={c:obj}
                    objGeneral3.push(o);
                }                
                for(var j=0;j<$scope.actividadesAnnio.length;j++)
                    {var obj=[];

                            obj=[{v:meses[$scope.actividadesAnnio[j].mes-1]},{v:$scope.actividadesAnnio[j].cont}];
                            console.log("encontrado en");
                            console.log(i);
                            console.log(obj);
                            var o={c:obj};
                            objGeneral3[$scope.actividadesAnnio[j].mes-1]=o;                   

                 }               
                    $scope.chartObject3 = {};    
                    $scope.chartObject3.type = "ColumnChart";                  
                    $scope.chartObject3.data = {"cols": [
                        {id: "t", label: "Topping", type: "string"},
                        {id: "s", label: "# Actividades", type: "number"}
                    ], "rows": objGeneral3                    
                    };
                    $scope.chartObject3.options = {
                        'title': 'Actividades Completadas',
                        isSD:true
                    };

             }).error(function(){
                alert("an unexpected error ocurred");
            });



                $http.post("php/getContactosVendedorMes.php",{'idvendedor':$scope.idvendedor,'tipo':'annio'}).success(function(data){
                $scope.contactos=data;
                console.log(data);
                var dataforChar=[];
                var objGeneral4=[];
                for (var i=1;i<=12;i++){
                    var obj=[{v:meses[i-1]},{v:0}];
                    var o={c:obj}
                    objGeneral4.push(o);
                }                
                for(var j=0;j<$scope.contactos.length;j++)
                    {var obj=[];

                            obj=[{v:meses[$scope.contactos[j].mes-1]},{v:$scope.contactos[j].cont}];
                            console.log("encontrado en");
                            console.log(i);
                            console.log(obj);
                            var o={c:obj};
                            objGeneral4[$scope.contactos[j].mes-1]=o;                   

                 }               
                  

                    $scope.chartObject4 = {};    
                    $scope.chartObject4.type = "ColumnChart";                  
                    $scope.chartObject4.data = {"cols": [
                        {id: "t", label: "Topping", type: "string"},
                        {id: "s", label: "# Contactos", type: "number"}
                    ], "rows": objGeneral4                    
                    };
                    $scope.chartObject4.options = {
                        'title': 'Contactos Encontrados',
                        isSD:true
                    };

             }).error(function(){
                alert("an unexpected error ocurred");
            });


/*estadisticas para el mes*/
$scope.ventasCerradasGanadasMes={status:"Cerrada Ganada",cont:0,total:0};
        $scope.ventasCerradasPerdidasMes={status:"Cerrada Perdida",cont:0,total:0};
        $scope.ventasEnProcesoMes={status:"En proceso",cont:0,total:0};

  $http.post("php/getVentasVendedor.php",{'idvendedor':$scope.idvendedor,'tipo':'mes'}).success(function(data){
        $scope.ventasVendedorMes=data;
          console.log($scope.ventasVendedorMes);

                  console.log($scope.ventasCerradasPerdidasMes);

          for(var i=0;i<$scope.ventasVendedorMes.length;i++)
          {
            if($scope.ventasVendedorMes[i].status=="Cerrada Ganada") 
                $scope.ventasCerradasGanadasMes=$scope.ventasVendedorMes[i];
             if($scope.ventasVendedorMes[i].status=="Cerrada Perdida") 
                $scope.ventasCerradasPerdidasMes=$scope.ventasVendedorMes[i];
             if($scope.ventasVendedorMes[i].status=="En proceso") 
                $scope.ventasEnProcesoMes=$scope.ventasVendedorMes[i];

          }

          console.log($scope.ventasCerradasPerdidasMes);


         
        }).error(function(){
            alert("an unexpected error ocurred");
        });






     $http.post("php/getActividadesMes.php",{'idvendedor':$scope.idvendedor,'tipo':'mes'}).success(function(data){
          $scope.actividadesCompletadasMes=data[0];
          $scope.actividadesPorCumplirMes=data[1]
          console.log($scope.actividadesCompletadasMes);

        }).error(function(){
            alert("an unexpected error ocurred");
        });



            $http.post("php/getVentasVendedorMes.php",{'idvendedor':$scope.idvendedor,'tipo':'mes'}).success(function(data){
                $scope.ventasporMes=data;
                console.log(data);
                var dataforCharVentas=[];
              var objGeneralVentasMes=[];
                for (var i=1;i<=31;i++){
                    var obj=[{v:i},{v:0}];
                    var o={c:obj}
                    objGeneralVentasMes.push(o);
                }                
                for(var j=0;j<$scope.ventasporMes.length;j++)
                    {var obj=[];

                            obj=[{v:$scope.ventasporMes[j].dia},{v:$scope.ventasporMes[j].total}];
                            console.log("encontrado en");
                            console.log(i);
                            console.log(obj);
                            var o={c:obj};
                            objGeneralVentasMes[$scope.ventasporMes[j].dia-1]=o;                   

                 }               
                 console.log(objGeneralVentasMes);
                  

                    $scope.chartObjectVentasAnnio = {};    
                    $scope.chartObjectVentasAnnio.type = "ColumnChart";                  
                    $scope.chartObjectVentasAnnio.data = {"cols": [
                        {id: "t", label: "Topping", type: "string"},
                        {id: "s", label: "$", type: "number"}
                    ], "rows": objGeneralVentasMes                    
                    };
                    $scope.chartObjectVentasAnnio.options = {
                        'title': 'Totales de Venta',
                        isSD:true
                    };

             }).error(function(){
                alert("an unexpected error ocurred");
            });




                $http.post("php/getNegociosGanadosMes.php",{'idvendedor':$scope.idvendedor,'tipo':'mes'}).success(function(data){
                $scope.negociosGanadosMes=data;
                console.log(data);
                var dataforChar=[];
                var chartObjectNegociosMes=[];
                for (var i=1;i<=31;i++){
                    var obj=[{v:i},{v:0}];
                    var o={c:obj}
                    chartObjectNegociosMes.push(o);
                }                
                for(var j=0;j<$scope.negociosGanadosMes.length;j++)
                    {var obj=[];
                            obj=[{v:$scope.negociosGanadosMes[j].dia},{v:$scope.negociosGanadosMes[j].total}];

                            obj=[{v:$scope.negociosGanadosMes[j].dia},{v:$scope.negociosGanadosMes[j].cont}];
                            console.log("encontrado en");
                            console.log(j);
                            console.log(obj);
                            var o={c:obj};
                            chartObjectNegociosMes[$scope.negociosGanadosMes[j].dia-1]=o;                   

                 }             
                    $scope.chartObjectNegociosMes = {};    
                    $scope.chartObjectNegociosMes.type = "ColumnChart";                  
                    $scope.chartObjectNegociosMes.data = {"cols": [
                        {id: "t", label: "Topping", type: "string"},
                        {id: "s", label: "# Negocios", type: "number"}
                    ], "rows": chartObjectNegociosMes                    
                    };
                    $scope.chartObjectNegociosMes.options = {
                        'title': 'Negocios ganados',
                        isSD:true
                    };

             }).error(function(){
                alert("an unexpected error ocurred");
            });





                $http.post("php/getActividadesVendedorMes.php",{'idvendedor':$scope.idvendedor,'tipo':'mes'}).success(function(data){
                $scope.actividadesporMes=data;
                console.log(data);
                var dataforChar=[];
                var objGeneralActividadesMes=[];
                for (var i=1;i<=31;i++){
                    var obj=[{v:i},{v:0}];
                    var o={c:obj}
                    objGeneralActividadesMes.push(o);
                }                
                for(var j=0;j<$scope.actividadesporMes.length;j++)
                    {var obj=[];

                            obj=[{v:$scope.actividadesporMes[j].dia},{v:$scope.actividadesporMes[j].cont}];
                            console.log("encontrado en");
                            console.log(i);
                            console.log(obj);
                            var o={c:obj};
                            objGeneralActividadesMes[$scope.actividadesporMes[j].dia-1]=o;                   

                 }               
                    $scope.chartObjectActividadesMes = {};    
                    $scope.chartObjectActividadesMes.type = "ColumnChart";                  
                    $scope.chartObjectActividadesMes.data = {"cols": [
                        {id: "t", label: "Topping", type: "string"},
                        {id: "s", label: "# Actividades", type: "number"}
                    ], "rows": objGeneralActividadesMes                    
                    };
                    $scope.chartObjectActividadesMes.options = {
                        'title': 'Actividades Completadas',
                        isSD:true
                    };

             }).error(function(){
                alert("an unexpected error ocurred");
            });



                $http.post("php/getContactosVendedorMes.php",{'idvendedor':$scope.idvendedor,'tipo':'mes'}).success(function(data){
                $scope.contactosporMes=data;
                console.log(data);
                var dataforChar=[];
                var objGeneralContactosMes=[];
                for (var i=1;i<=31;i++){
                    var obj=[{v:i},{v:0}];
                    var o={c:obj}
                    objGeneralContactosMes.push(o);
                }                
                for(var j=0;j<$scope.contactosporMes.length;j++)
                    {var obj=[];
                            obj=[{v:$scope.contactosporMes[j].dia},{v:$scope.contactosporMes[j].cont}];
                            console.log("encontrado en");
                            console.log(i);
                            console.log(obj);
                            var o={c:obj};
                            objGeneralContactosMes[$scope.contactosporMes[j].dia-1]=o;                   

                 }               
                  

                    $scope.chartObjectContactosMes = {};    
                    $scope.chartObjectContactosMes.type = "ColumnChart";                  
                    $scope.chartObjectContactosMes.data = {"cols": [
                        {id: "t", label: "Topping", type: "string"},
                        {id: "s", label: "# Contactos", type: "number"}
                    ], "rows": objGeneralContactosMes                    
                    };
                    $scope.chartObjectContactosMes.options = {
                        'title': 'Contactos Encontrados',
                        isSD:true
                    };

             }).error(function(){
                alert("an unexpected error ocurred");
            });






/*estadisticas para la semana*/
             $http.post("php/getVentasVendedorMes.php",{'idvendedor':$scope.idvendedor,'tipo':'semana'}).success(function(data){
                $scope.ventasporSemana=data;
                console.log(data);
                var dataforCharVentas=[];
              var objGeneralVentasSemana=[];
                for (var i=1;i<=7;i++){
                    var obj=[{v:dias[i-1]},{v:0}];
                    var o={c:obj}
                    objGeneralVentasSemana.push(o);
                }                
                for(var j=0;j<$scope.ventasporSemana.length;j++)
                    {var obj=[];
                        

                            var index = diasIngles.indexOf($scope.ventasporSemana[j].dia);
                            obj=[{v:dias[index]},{v:$scope.ventasporSemana[j].total}];
                            console.log("encontrado en");
                            console.log(i);
                            console.log(obj);
                            var o={c:obj};
                            objGeneralVentasSemana[index]=o;                   

                 }               
                 console.log(objGeneralVentasSemana);
                  

                    $scope.chartObjectVentasSemana = {};    
                    $scope.chartObjectVentasSemana.type = "ColumnChart";                  
                    $scope.chartObjectVentasSemana.data = {"cols": [
                        {id: "t", label: "Topping", type: "string"},
                        {id: "s", label: "$", type: "number"}
                    ], "rows": objGeneralVentasSemana                    
                    };
                    $scope.chartObjectVentasSemana.options = {
                        'title': 'Totales de Venta',
                        isSD:true
                    };

             }).error(function(){
                alert("an unexpected error ocurred");
            });










        


        
    }
  }).error(function(){
      alert("an unexpected error ocurred")
 });






}]);