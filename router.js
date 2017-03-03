'use strict';
var app = angular.module('app', ['ngAnimate','xeditable','ui.bootstrap','ui.router','angularUtils.directives.dirPagination','googlechart',"chart.js"]);
app.run(function(editableOptions,$rootScope,$state) {
  editableOptions.theme = 'bs3'; 


});


app.directive('fileChange',['$parse', function($parse){
  return{
    require:'ngModel',
    restrict:'A',
    link:function($scope,element,attrs,ngModel){
      var attrHandler=$parse(attrs['fileChange']);
      var handler=function(e){
        $scope.$apply(function(){
          attrHandler($scope,{$event:e,files:e.target.files});
        });
      };
      element[0].addEventListener('change',handler,false);
    }
  }
}]);

app.filter('csvToObj',function(){
  return function(input){
    console.log("filtrooooooooooooooooooooooooo");
    var rows=input.split('\n');
    console.log(rows);
    var obj=[];
    angular.forEach(rows,function(val){
      var o=val.split(',');
      obj.push({
        nombreContacto:o[0],        
        puesto:o[1],
        empresa:o[2],
        telefono:o[3],
        celular:o[4],
        correo:o[5],
        fechaNacimiento:o[6]
      });
    });
    console.log(input);
    console.log(obj);
    return obj;
  };
});

app.directive('dateFix', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ngModel) {
            element.on('change', function() {
                scope.$apply(function () {
                    ngModel.$setViewValue(element.val());
                });         
            });
        }
    };
});






    var c=[{
                nombre:'Gisselle',
                apellido:'Sanchez',
                fechaNacimiento:'12/05/1993',
                observaciones:'s'
          }];



 app.config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      colours: ['#D1A538', '#CBB98C'],
      responsive: true
    });
    // Configure all line charts
    ChartJsProvider.setOptions('Line', {
      datasetFill: false
    });
  }]);

app.config(function($stateProvider, $urlRouterProvider) {


    
    $urlRouterProvider.otherwise('/login');    
    $stateProvider             
        // HOME STATES AND NESTED VIEWS ========================================

          .state('login', {
            url: '/login',           
            controller:'loginController',
            authenticate: false,
            views: 
                  {                 
                    fullContainer: {
                      templateUrl: 'login.html',
                      controller:'loginController'
                    }
                 }            
        })


          .state('main', {
            url: '/main',           
            authenticate: false,
            views: 
                  {                 
                    fullContainer: {
                      templateUrl: 'www/componentes/navegacion/navegacion.html'
                    }
                 }            
        })

        .state('main.tablero', {
            url: '/tablero',           
            controller:'tableroController',
             authenticate: false,
            views: 
                  {          
                     
                    "content": {
                      templateUrl: 'www/componentes/vistaVendedor/tablero/tablero.html',
                      controller:'tableroController'
                    }
                 }            
        })



    .state('main.negocios', {
            url: '/negocios',           
            controller:'homeController',
             authenticate: false,
            views: 
                  {          
                     
                    "content": {
                      templateUrl: 'www/componentes/negocios/ciclodeVentas.html',
                      controller:'homeController'
                    }
                 }            
        })

    .state('main.ventas', {
            url: '/ventas',           
            controller:'ventasConcretadasController',
             authenticate: false,
            views: 
                  {     
                            
                    "content": {
                      templateUrl: 'www/componentes/ventas/ventasConcretadas.html',
                      controller:'ventasConcretadasController'
                    }
                 }            
        })


     .state('main.venta', {
            url: '/venta/:nombre',
            controller:'ventaController',
             authenticate: true,
            views: 
                  {
               
                      "content": {
                        templateUrl: 'www/componentes/venta/venta.html',
                        controller:'ventaController'
                      }
                  }
        })






        .state('main.productos', {
            url: '/productos',           
            controller:'productosController',
             authenticate: false,
            views: 
                  { 
                                
                    "content": {
                      templateUrl: 'www/componentes/productos/productos.html',
                      controller:'productosController'
                    }
                 }            
        })

      .state('main.contactos', {
                url: '/contactos',
                controller:'clientesController',
                             authenticate: true,

                views: 
                      {
                   
                         
                          "content": {
                            templateUrl: 'www/componentes/clientes/clientes.html',
                            controller:'clientesController'
                          }
                      }
            })


        .state('main.contacto', {
            url: '/contacto/:id/:nombreContacto',
            controller:'contactoController',
             authenticate: true,
            views: 
                  {
                 
                      "content": {
                        templateUrl: 'contacto.html',
                        controller:'contactoController'
                      }
                  }
        })


        .state('main.estadisticas', {
            url: '/estadisticas',
            controller:'estadisticasController',
                         authenticate: true,

            views: 
                  {
                  
                      "content": {
                        templateUrl: 'www/componentes/vistaGerente/estadisticas/estadisticas.html',
                        controller:'estadisticasController'
                      }
                  }
        })

                 .state('main.estadisticasGerente', {
            url: '/estadisticasGerente',
            controller:'estadisticasGerenteController',
                         authenticate: true,

            views: 
                 {
                      "content": {
                        templateUrl: 'estadisticasGerente.html',
                        controller:'estadisticasGerenteController'
                      }
                  }
        })

          .state('main.configuracion', {
            url: '/configuracion',
            controller:'configuracionController',
                         authenticate: true,

            views: 
                  {
                      
                      "content": {
                        templateUrl: 'www/componentes/configuracion/configuracion.html',
                        controller:'configuracionController'
                      }
                  }
        })

                 

 .state('main.grupos', {
            url: '/grupos',
            controller:'gruposController',
                         authenticate: true,

            views: 
                  {
                     
                      "content": {
                        templateUrl: 'www/componentes/vistaGerente/grupo/grupos.html',
                        controller:'gruposController'
                      }
                  }
        })


 .state('main.grupo', {
            url: '/grupo/:idGrupo/:nombre',
            controller:'grupoController',
                         authenticate: true,

            views: 
                  {
                 
                      "content": {
                        templateUrl: 'www/componentes/vistaGerente/grupo/grupo.html',
                        controller:'grupoController'
                      }
                  }
        })

         .state('main.objetivosGerente', {
            url: '/objetivosGerente',
            controller:'objetivosGerenteController',
                         authenticate: true,

            views: 
                  {
                     
                      "content": {
                        templateUrl: 'www/componentes/vistaGerente/objetivos/objetivos.html',
                        controller:'objetivosGerenteController'
                      }
                  }
        })

                 
          .state('main.asignaciones', {
            url: '/asignaciones',
            controller:'asignacionesController',
                         authenticate: true,

            views: 
                  {
                     
                      "content": {
                        templateUrl: 'www/componentes/vistaGerente/asignaciones/asignaciones.html',
                        controller:'asignacionesController'
                      }
                  }
        })

         .state('main.perfil', {
            url: '/perfil',
            controller:'perfilController',
                         authenticate: true,

            views: 
                  {
                     
                      "content": {
                        templateUrl: 'www/componentes/perfil/perfil.html',
                        controller:'perfilController'
                      }
                  }
        })

                 
   

   



            
});
