angular.module('app')

    .factory('estadisticasService', ['$http', '$q', '$rootScope', function($http, $q,$rootScope){
        return {
   
            getActividadesCompletadas: function(tipo,idtipo, mes,annio){            
                return $http({
                    url: 'php/estadisticas/getStatusActividades.php',
                    method: "PUT",
                    data:{tipo:tipo,idtipo:idtipo,mes:mes,annio:annio,status:'Completada'},
                    headers: {'Content-Type': 'application/json'}
                })
                    .then(function(data){
                        console.log(tipo);
                        console.log(data.data);

                                          
                        return data.data;
                    }, function(data){
                        return $q.reject(data.data);
                    });

               
            },  



             getActividadesNoCompletadas: function(tipo,idtipo, mes,annio){            
                return $http({
                    url: 'php/estadisticas/getStatusActividades.php',
                    method: "PUT",
                    data:{tipo:tipo,idtipo:idtipo,mes:mes,annio:annio,status:'No Completada'},
                    headers: {'Content-Type': 'application/json'}
                })
                    .then(function(data){
                        console.log(tipo);
                        console.log(data.data);

                                          
                        return data.data;
                    }, function(data){
                        return $q.reject(data.data);
                    });

               
            },  


            getTotalesVenta: function(tipo,idtipo, mes,annio){            
            	return $http({
                    url: 'php/estadisticas/getTotalesVenta.php',
                    method: "PUT",
                    data:{tipo:tipo,idtipo:idtipo,mes:mes,annio:annio},
                    headers: {'Content-Type': 'application/json'}
                })
                    .then(function(data){
                        console.log(tipo);
                    	console.log(data.data);
                    	var convertedToGraphFormat=[];

                        if(mes==0 && annio!=0){
                            for(var i=0;i<12;i++)
                                convertedToGraphFormat[i]=0;                           
                            
                            for(var i=0;i<data.data.length;i++){
                                console.log(data.data[i].sep);
                                var sep=data.data[i].sep-1;
                                convertedToGraphFormat[sep]=data.data[i].total;
                            }                       
                                 

                        }
                        if(mes!=0){
                            for(var i=0;i<31;i++)
                                convertedToGraphFormat[i]=0;                                                   
                        
                            for(var i=0;i<data.data.length;i++){
                                console.log(data.data[i].sep);
                                var sep=data.data[i].sep-1;
                                convertedToGraphFormat[sep]=data.data[i].total;
                            }                       

                        }

                       var year = 2016;
                        var week = 20;

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
                         var x= getDateOfISOWeek(20,2016);
                         console.log(x);
                        
                            function getDateOfISOWeek(w, y) {
                                var simple = new Date(y, 0, 1 + (w - 1) * 7);
                                var dow = simple.getDay();
                                var ISOweekStart = simple;
                                if (dow <= 4)
                                    ISOweekStart.setDate(simple.getDate() - simple.getDay() +1 );
                                else
                                    ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
                                return ISOweekStart;
                            }


                        if(mes==0 && annio ==0){
                            for(var i=0;i<7;i++)
                                convertedToGraphFormat[i]=0;

                            for(var i=0;i<data.data.length;i++){
                                console.log(data.data[i]);
                                var sep=data.data[i].sep;
                                console.log(x.getDate());
                                convertedToGraphFormat[sep-x.getDate()+1]=data.data[i].total;
                             }      

                        }


                        console.log(convertedToGraphFormat);
                        return convertedToGraphFormat;
                    }, function(data){
                        return $q.reject(convertedToGraphFormat);
                    });

               
            },  
              getTotalesContactos: function(tipo,idtipo, mes,annio){            
            	return $http({
                    url: 'php/estadisticas/getTotalesContactos.php',
                    method: "PUT",
                    data:{tipo:tipo,idtipo:idtipo,mes:mes,annio:annio},
                    headers: {'Content-Type': 'application/json'}
                })
                    .then(function(data){
                    	console.log(data.data);
                    	var convertedToGraphFormat=[];

                        if(mes==0 && annio!=0){
                            for(var i=0;i<12;i++)
                            convertedToGraphFormat[i]=0;                            
                            for(var i=0;i<data.data.length;i++){
                                console.log(data.data[i].sep);
                                var sep=data.data[i].sep-1;
                                convertedToGraphFormat[sep]=data.data[i].cont;
                            }   
                       
                        }
                        if(mes!=0){

                            for(var i=0;i<31;i++)
                            convertedToGraphFormat[i]=0;
                            for(var i=0;i<data.data.length;i++){
                                console.log(data.data[i].sep);
                                var sep=data.data[i].sep-1;
                                convertedToGraphFormat[sep]=data.data[i].cont;
                            }   
                        
                        }

                      
                        var year = 2016;
                        var week = 20;

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
                         var x= getDateOfISOWeek(20,2016);
                         console.log(x);
                                 function getDateOfISOWeek(w, y) {
                                var simple = new Date(y, 0, 1 + (w - 1) * 7);
                                var dow = simple.getDay();
                                var ISOweekStart = simple;
                                if (dow <= 4)
                                    ISOweekStart.setDate(simple.getDate() - simple.getDay() +1 );
                                else
                                    ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
                                return ISOweekStart;
                            }

                        

                        if(mes==0 && annio ==0){
                            for(var i=0;i<7;i++)
                                convertedToGraphFormat[i]=0;

                            for(var i=0;i<data.data.length;i++){
                                console.log(data.data[i]);
                                var sep=data.data[i].sep;
                                console.log(x.getDate());
                                convertedToGraphFormat[sep-x.getDate()+1]=data.data[i].cont;
                             }      

                        }         	
                        return convertedToGraphFormat;
                    }, function(data){
                        return $q.reject(convertedToGraphFormat);
                    });

               
             },  


            getTotalesActividades: function(tipo,idtipo, mes,annio){            
                return $http({
                    url: 'php/estadisticas/getTotalesActividades.php',
                    method: "PUT",
                    data:{tipo:tipo,idtipo:idtipo,mes:mes,annio:annio},
                    headers: {'Content-Type': 'application/json'}
                })
                    .then(function(data){
                        console.log(data.data);
                        var convertedToGraphFormat=[];
                        if(mes==0 && annio!=0) {
                            for(var i=0;i<12;i++)
                              convertedToGraphFormat[i]=0;

                           for(var i=0;i<data.data.length;i++){
                            console.log(data.data[i]);
                            var sep=data.data[i].sep-1;
                            convertedToGraphFormat[sep]=data.data[i].cont;
                            }      


                        }
                        if(mes!=0){
                            for(var i=0;i<31;i++)
                                convertedToGraphFormat[i]=0;

                             for(var i=0;i<data.data.length;i++){
                            console.log(data.data[i]);
                            var sep=data.data[i].sep-1;
                            convertedToGraphFormat[sep]=data.data[i].cont;
                            }      
                        
                        }

                        var year = 2016;
                        var week = 20;

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
                         var x= getDateOfISOWeek(20,2016);
                         console.log(x);
                                 function getDateOfISOWeek(w, y) {
                                var simple = new Date(y, 0, 1 + (w - 1) * 7);
                                var dow = simple.getDay();
                                var ISOweekStart = simple;
                                if (dow <= 4)
                                    ISOweekStart.setDate(simple.getDate() - simple.getDay() +1 );
                                else
                                    ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
                                return ISOweekStart;
                            }

                        

                        if(mes==0 && annio ==0){
                            for(var i=0;i<7;i++)
                                convertedToGraphFormat[i]=0;

                            for(var i=0;i<data.data.length;i++){
                                console.log(data.data[i]);
                                var sep=data.data[i].sep;
                                console.log(x.getDate());
                                convertedToGraphFormat[sep-x.getDate()+1]=data.data[i].cont;
                             }      

                        }

                                        
                        console.log(convertedToGraphFormat);

                        return convertedToGraphFormat;
                    }, function(data){
                        return $q.reject(convertedToGraphFormat);
                    });

               
             },  

    
            getTotalesNegocios: function(tipo,idtipo, mes,annio){            
                return $http({
                    url: 'php/estadisticas/getTotalesNegocios.php',
                    method: "PUT",
                    data:{tipo:tipo,idtipo:idtipo,mes:mes,annio:annio},
                    headers: {'Content-Type': 'application/json'}
                })
                    .then(function(data){
                        console.log(data.data);
                        var convertedToGraphFormat=[];
                        if(mes==0 && annio!=0){
                            for(var i=0;i<12;i++)
                                convertedToGraphFormat[i]=0;
                                for(var i=0;i<data.data.length;i++){
                                    console.log(data.data[i]);
                                    var sep=data.data[i].sep-1;
                                    convertedToGraphFormat[sep]=data.data[i].cont;                                 
                                }                          
                        }
                        if(mes!=0){
                            for(var i=0;i<31;i++)
                                convertedToGraphFormat[i]=0;
                                for(var i=0;i<data.data.length;i++){
                                    console.log(data.data[i]);
                                    var sep=data.data[i].sep-1;
                                    convertedToGraphFormat[sep]=data.data[i].cont;
                                }  
                        }

                             var year = 2016;
                        var week = 20;

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
                         var x= getDateOfISOWeek(20,2016);
                         console.log(x);
                                 function getDateOfISOWeek(w, y) {
                                var simple = new Date(y, 0, 1 + (w - 1) * 7);
                                var dow = simple.getDay();
                                var ISOweekStart = simple;
                                if (dow <= 4)
                                    ISOweekStart.setDate(simple.getDate() - simple.getDay() +1 );
                                else
                                    ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
                                return ISOweekStart;
                            }

                        

                        if(mes==0 && annio ==0){
                            for(var i=0;i<7;i++)
                                convertedToGraphFormat[i]=0;

                            for(var i=0;i<data.data.length;i++){
                                console.log(data.data[i]);
                                var sep=data.data[i].sep;
                                console.log(x.getDate());
                                convertedToGraphFormat[sep-x.getDate()+1]=data.data[i].cont;
                             }      

                        }






                       
                       


                        console.log(convertedToGraphFormat);
                        return convertedToGraphFormat;
                    }, function(data){
                        return $q.reject(convertedToGraphFormat);
                    });

               
             },  





    


        };
    }]);
