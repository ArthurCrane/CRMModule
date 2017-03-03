angular.module('app')

    .factory('validationService', ['$http', '$q', '$rootScope', function($http, $q,$rootScope){
        return {
            validateProducto: function(producto, productos){
                var errores={};
                console.log(producto);
                if(producto.nombreProducto==undefined){
                    errores.errorNombre="Ingresa un nombre";
                }else{
                    if(producto.nombreProducto.length>50){
                        errores.errorNombre="Ingresa un nombre con menos caracteres";
                    }
                }
                if(producto.precio==undefined){
                     errores.errorPrecio="Ingresa un precio";
                }else{
                    if(producto.precio.length>7){
                        errores.errorPrecio="Ingresa un precio menor";
                    }
                     if (!/^([0-9])*$/.test(producto.precio)){
                    errores.errorPrecio="Ingresa un precio válido";
                    }
                }

                if(producto.descripcion==undefined){
                    // errores.errorDescripcion="Ingresa una descripcion";
                }else{
                    if(producto.descripcion.length>300){
                        errores.errorDescripcion="Ingresa una descripcion más corta";
                    }
                    var palabras = (producto.descripcion).split(" ");
                                for(var i=0;i<palabras.length;i++){
                                    if(palabras[i].length>27){                                       
                                        errores.errorDescripcion="Ingresa una descripción válida";
                                    }
                                }
                }

                if(producto.propiedades==undefined){
                    // errores.errorDescripcion="Ingresa una descripcion";
                }else{
                    if(producto.propiedades.length>300){
                        errores.errorPropiedades="Ingresa un texto más corto";
                    }

                       var palabras = (producto.propiedades).split(" ");
                                for(var i=0;i<palabras.length;i++){
                                    if(palabras[i].length>27){                                       
                                        errores.errorPropiedades="Ingresa propiedades válidas";
                                    }
                                }



                }

                if(producto.existencias!=undefined){
                    if(!/^([0-9])*$/.test(producto.existencias)){
                        errores.errorExistencias="Ingresa una cantidad válida";
                    }

                }

            



               console.log(errores);

                return errores;

               
            },  
            validateGrupo: function(grupo){

                var errores={};
                console.log(grupo);
                if(grupo.nombre==undefined){
                    errores.errorNombre="Ingresa un nombre";
                }else{
                    if(grupo.nombre.length>50){
                        errores.errorNombre="Ingresa un nombre más corto";
                    }
                }

                if(grupo.descripcion!=undefined){
              
                    if(grupo.descripcion.length>300){
                        errores.errorNombre="Ingresa una descripción mas corta";
                    }
                }


               console.log(errores);

                return errores;

            },
            validateCliente: function(contacto){
                var errores={};
                console.log("contactos");
                if(contacto.nombreContacto==undefined){
                    errores.errorNombre="Ingresa un nombre para el contacto";
                }else{
                    if(contacto.nombreContacto.length>100){
                        errores.errorNombre="Ingresa un nombre más corto";
                    }
                }

                if(contacto.celular==undefined){
                    errores.errorCelular="Ingresa un celular";
                }else{
                    if(!/^([0-9])*$/.test(contacto.celular)){
                        errores.errorCelular="Ingresa un celular válido";
                    }
                }

                if(contacto.correo==undefined){
                    errores.errorCorreo="Ingresa un correo";
                }else{
                    if(contacto.correo.length>50){
                        errores.errorCorreo="Ingresa un correo válido";
                    }
                }

                if(contacto.telefono!=undefined){
                    if(!/^([0-9])*$/.test(contacto.telefono)){
                        errores.errorTelefono="Ingresa un teléfono válido";
                    }
                }

                if(contacto.fechaNacimiento!=undefined){
                     var d= new Date();
                    var today=d.getDate();
                    if( (contacto.fechaNacimiento).getFullYear() >= d.getFullYear()){
                        errores.errorFechaNacimiento="Ingresa una fecha válida";
                    }
                }

                if(contacto.telefonoSecretaria!=undefined){
                    if(!/^([0-9])*$/.test(contacto.telefonoSecretaria)){
                        errores.errorTelefonoSecretaria="Ingresa un teléfono válido";
                    }
                }



               console.log(errores);

                return errores;

            },

            validateObjetivo: function(objetivo,rango){
                console.log(objetivo);

                var errores={};
                console.log(objetivo);
                if(objetivo.tipo==undefined){
                    errores.errorTipo="Ingresa un tipo de objetivo";                    
                }

                if(objetivo.cantidad==undefined){
                    errores.errorCantidad="Ingresa una cantidad a vencer para el objetivo";
                }else{
                    if(!/^([0-9])*$/.test(objetivo.cantidad))
                        errores.errorCantidad="Ingresa una cantidad válida";
                }

                if(rango=="mes"){
                    if(objetivo.mes==undefined){
                        errores.errorMes="Selecciona un mes para el objetivo";

                    }
                    else{
                        var d= new Date();
                        var today=d.getDate();
                        if(  objetivo.mes.getFullYear()  < d.getFullYear()  || ( objetivo.mes.getFullYear ()  == d.getFullYear() &&  objetivo.mes.getMonth() < d.getMonth())  ){
                            errores.errorMes="Ingresa un mes a futuro";
                        }

                    }

                }else{
                    if(objetivo.annio==undefined){
                        errores.errorAnnio="Escribe un año para el objetivo";

                    }else{
                        var d =new Date();
                        var today=d.getDate();
                        if(objetivo.annio < d.getFullYear()){
                            errores.errorAnnio="Ingresa un año a futuro";
                        }
                    }

                }

                console.log(errores);

                return errores;




            },
   

        };
    }]);