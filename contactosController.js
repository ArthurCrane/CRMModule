app.controller('contactosController', ['$scope','$timeout','$http','$rootScope','$state','$filter', function($scope,$timeout,$http,$rootScope,$state,$filter){
	$scope.contactos=[];
	$scope.NuevoContacto={};
	$rootScope.contactoAModificar={};
	console.log("controlador de contactos");
	 $scope.NuevoContacto.imagen="";
	 $rootScope.contactoAModificar.imagen="";



	$scope.MyFiles=[];

$scope.handler=function(e,files)
{
	console.log("handllllllllllllllerrr");
    var reader=new FileReader();
    reader.onload=function(e)
    {
        var string=reader.result;
        var object=$filter('csvToObj')(string);
        //do what you want with obj !   
        	console.log(object);

        	for(var i=0;i<object.length-1;i++){
        		console.log(object[i]);
        		object[i].imagen="";
        		object[i].anotaciones="";
        		var obj=object[i];


        		 console.log("tratando de insertar");
			          $http.post("php/insertarContacto.php", object[i]).success(function(data,status,headers,config){
			                console.log("Inserted Succesfully");
			                console.log(data[0]);
			                if(data[0]=="error"){
				                	console.log("ERRRRRRRRRRRRROOOOOOOOOR");
				                	//alert("Error con alguno de los contactos");

			                }else{								
								$scope.contactos.push(data[0]);	
								console.log($scope.contactos);

			                }
			                //var obj=$scope.NuevoContacto;
			                

			            });


        	}

			               // $scope.NuevoContacto={};
			                alert("Tabla Actualizada");

    }
    reader.readAsText(files[0]);

}



$scope.archivo={};
/*
$scope.uploadFile=function(files){
	 var fd = new FormData();

	 fd.append("file", files[0]);
	 fd.append("name","prueba");


	 $http.post("server.php", fd, {
        withCredentials: true,
        headers: {'Content-Type': undefined },
        transformRequest: angular.identity}).success(function(data,status,headers,config){
    	console.log("success");
    	console.log(data);
    })


}
*/

//   $scope.ventas2=[];
  $http.get("php/checarSesion.php").success(function(data){
  $scope.sesion=data;
  console.log("sesion");
  console.log($scope.sesion);

  if($scope.sesion=="false"){
    document.getElementById('contenidoContactos').style.display = 'none';

    console.log("falsse");
   $state.go('login');

  }else{
    document.getElementById('contenidoContactos').style.display = 'block';

    console.log("truee");
  }


    }).error(function(){
      alert("an unexpected error ocurred")
    });


 	$http.get("php/contactos.php").success(function(data){
 	$scope.contactosSinCambioFecha=[];
    $scope.contactosSinCambioFecha=data;
    console.log("contactos");
    console.log(data);
    console.log("for");

    for(i=0; i < $scope.contactosSinCambioFecha.length; i++)
    {
    	var fecha=new Date($scope.contactosSinCambioFecha[i].fechaNacimiento);
    	$scope.contactosSinCambioFecha[i].fechaNacimiento=fecha;
    	$scope.contactos.push($scope.contactosSinCambioFecha[i]);
    //	console.log("en el for");
    //	console.log($scope.contactos);

    }

    console.log("Contactos modificados fecha");
    console.log($scope.contactos);


	  }).error(function(){
	      alert("an unexpected error ocurred")
	  });


  $http.get("php/getVentas.php").success(function(data){
    $scope.ventas=data;
    console.log("ventas");
    console.log(data);
   
  }).error(function(){
      alert("an unexpected error ocurred")
  });



  $rootScope.contactoActualizado={};
	$scope.editarContacto=function(contacto){
		console.log("FUNCION EDITAR contacto");

 	//	$rootScope.contactoAModificar=contacto;
	 	$scope.errorNombre="";
	  	$scope.errorPuesto="";
	  	$scope.errorEmpresa="";
	  	$scope.errorTelefono="";
	  	$scope.errorCelular="";
		$scope.errorCorreo="";
	  	$scope.errorCumpleanos="";
	  	$scope.errorAnotaciones="";

	  	$rootScope.contactoAModificar.idContacto=contacto.idContacto;
	  	$rootScope.contactoAModificar.nombreContacto=contacto.nombreContacto;
	  	$rootScope.contactoAModificar.puesto=contacto.puesto;
	  	$rootScope.contactoAModificar.empresa=contacto.empresa;
	  	$rootScope.contactoAModificar.telefono=contacto.telefono;
	  	$rootScope.contactoAModificar.celular=contacto.celular;
	  	$rootScope.contactoAModificar.correo=contacto.correo;
	  	$rootScope.contactoAModificar.fechaNacimiento=contacto.fechaNacimiento;
	  	$rootScope.contactoAModificar.anotaciones=contacto.anotaciones;


	  	$rootScope.contactoActualizado=contacto;

	}



	$scope.setContactoABorrar=function(contacto){

	 	$rootScope.contactoABorrar=contacto;
		console.log($rootScope.contactoAModificar);
	}



	$scope.borrarContacto=function(contacto){

		var error=false;
		for(var i=0;i<$scope.ventas.length;i++)
		{
			if($scope.ventas[i].contacto==$rootScope.contactoABorrar.nombreContacto){
			    		error=true;
			}

		}
		console.log(error);


	    if(!error){    	
	    	
		    $http.post("php/borrarContacto.php", {'idContacto':$scope.contactoABorrar.idContacto}).success(function(data,status,headers,config){
		                console.log("Deleted Succesfully")
		                console.log(data);
		                alert("Contacto Borrado");
		            })               
		            //location.reload();    
		            

				var index = $scope.contactos.indexOf($scope.contactoABorrar);
				$scope.contactos.splice(index, 1);   
				//console.log("nuevos productos");
			//	console.log($scope.productos);


		    }else{
		    	alert("El Contacto no se puede borrar, tiene ventas asignadas");

		    }



	}

	$(function () {
	       $('#fileupload').fileupload({
	        dataType: 'json',
	        done: function (e, data) 
	        {
	            $.each(data.result.files, function (index, file) 
	            {
	                $('<p/>').text(file.name).appendTo(document.body);
	                console.log(file);
	                console.log(file.url);
	                $scope.NuevoContacto.imagen=file.url;
	                console.log($scope.NuevoContacto.imagen);


	            });
	        }
	    });
	});



	$(function () {
	       $('#fileupload2').fileupload({
	        dataType: 'json',
	        done: function (e, data) 
	        {
	            $.each(data.result.files, function (index, file) 
	            {
	               // $('<p/>').text(file.name).appendTo(document.body);
	                console.log(file);
	                console.log(file.url);
	                $rootScope.contactoAModificar.imagen=file.url;
	                console.log($rootScope.contactoAModificar.imagen);


	            });
	        }
	    });
	});




$scope.agregarContacto=function()
  {
  	var error=false;
  	$scope.errorNombre="";
  	$scope.errorPuesto="";
  	$scope.errorEmpresa="";
  	$scope.errorTelefono="";
  	$scope.errorCelular="";
	$scope.errorCorreo="";
  	$scope.errorCumpleanos="";
  	$scope.errorAnotaciones="";


	    if($scope.NuevoContacto.nombreContacto==undefined){
	        $scope.errorNombre="Ingresa un nombre";
	        error=true;
	    }
	    if($scope.NuevoContacto.puesto==undefined){
	         $scope.errorPuesto="Ingresa un puesto";
	        error=true;
	    }

	    if($scope.NuevoContacto.empresa==undefined){
	         $scope.errorEmpresa="Ingresa una empresa";
	        error=true;
	    }
	     if($scope.NuevoContacto.telefono==undefined){
	        $scope.errorTelefono="Ingresa un teléfono";
	        error=true;
	    }
	    if($scope.NuevoContacto.celular==undefined){
	         $scope.errorCelular="Ingresa el celular";
	        error=true;
	    }

	    if($scope.NuevoContacto.correo==undefined){
	         $scope.errorCorreo="Ingresa una correo";
	        error=true;
	    }
	      if($scope.NuevoContacto.fechaNacimiento==undefined){
	        $scope.errorCumpleanos="Ingresa el cumpleaños";
	        error=true;
	    }
	    if($scope.NuevoContacto.anotaciones==undefined){
	         $scope.errorAnotaciones="Ingresa anotaciones para el contacto";
	        error=true;
	    }



	    console.log($scope.NuevoContacto.imagen);
	    if(!error){
	    	 console.log("tratando de insertar");
	          $http.post("php/insertarContacto.php", $scope.NuevoContacto).success(function(data,status,headers,config){
	                console.log("Inserted Succesfully");
	                console.log(data[0]);
	                  if(data[0]==""){
				               console.log("ERRRRRRRRRRRRROOOOOOOOOR");
				               alert("El contacto ya existe");

			           }else{								
								$scope.contactos.push(data[0]);	
								console.log($scope.contactos);

			            }

	             //   var obj=$scope.NuevoContacto;
	             //   $scope.contactos.push(obj);
	                $scope.NuevoContacto={};
	                $("[data-dismiss=modal]").trigger({ type: "click" });
	                alert("Contacto Insertado");
	            });
	    }
  }



	$scope.guardarContacto=function(){


	  	var error=false;
	  	$scope.errorNombre="";
	  	$scope.errorPuesto="";
	  	$scope.errorEmpresa="";
	  	$scope.errorTelefono="";
	  	$scope.errorCelular="";
		$scope.errorCorreo="";
	  	$scope.errorCumpleanos="";
	  	$scope.errorAnotaciones="";


	    if($rootScope.contactoAModificar.nombreContacto==undefined){
	        $scope.errorNombre="Ingresa un nombre";
	        error=true;
	    }
	    if($rootScope.contactoAModificar.puesto==undefined){
	         $scope.errorPuesto="Ingresa un puesto";
	        error=true;
	    }

	    if($rootScope.contactoAModificar.empresa==undefined){
	         $scope.errorEmpresa="Ingresa una empresa";
	        error=true;
	    }
	     if($rootScope.contactoAModificar.telefono==undefined){
	        $scope.errorTelefono="Ingresa un teléfono";
	        error=true;
	    }
	    if($rootScope.contactoAModificar.celular==undefined){
	         $scope.errorCelular="Ingresa el celular";
	        error=true;
	    }

	    if($rootScope.contactoAModificar.correo==undefined){
	         $scope.errorCorreo="Ingresa una correo";
	        error=true;
	    }
	      if($rootScope.contactoAModificar.fechaNacimiento==undefined){
	        $scope.errorCumpleanos="Ingresa la fecha de Nacimiento";
	        error=true;
	    }
	    if($rootScope.contactoAModificar.anotaciones==undefined){
	         $scope.errorAnotaciones="Ingresa anotaciones para el contacto";
	        error=true;
	    }

	    var palabras = ($rootScope.contactoAModificar.anotaciones).split(" ");

	    for(var i=0;i<palabras.length;i++){

	    	if(palabras[i].length>27){
	    		error=true;
	    		$scope.errorAnotaciones="Ingresa una anotación correcta";
	    	}
	    }

	    console.log($rootScope.contactoAModificar);


	    if(!error){

           $http.put('php/actualizarContacto.php', $rootScope.contactoAModificar).success(function(data){
               console.log(data);                 
                console.log("Actualizado");


			  	$rootScope.contactoActualizado.idContacto=$rootScope.contactoAModificar.idContacto;
			  	$rootScope.contactoActualizado.nombreContacto=$rootScope.contactoAModificar.nombreContacto;
			  	$rootScope.contactoActualizado.puesto=$rootScope.contactoAModificar.puesto;
			  	$rootScope.contactoActualizado.empresa=$rootScope.contactoAModificar.empresa;
			  	$rootScope.contactoActualizado.telefono=$rootScope.contactoAModificar.telefono;
			  	$rootScope.contactoActualizado.celular=$rootScope.contactoAModificar.celular;
			  	$rootScope.contactoActualizado.correo=$rootScope.contactoAModificar.correo;
			  	$rootScope.contactoActualizado.fechaNacimiento=$rootScope.contactoAModificar.fechaNacimiento;
			  	$rootScope.contactoActualizado.anotaciones=$rootScope.contactoAModificar.anotaciones;






              });  
           $("[data-dismiss=modal]").trigger({ type: "click" });
          alert("Contacto Actualizado " );






	    }













	}


}]);
