
<div ng-controller="homeController as homeCtrl">
	<div class="col-xs-12 col-md-12">
		<div class="col-xs-8 col-md-8">
			<h1>Ciclo de Negociación de la Venta</h1>
		</div>
		<div class="col-xs-4 col-md-4">
			<button id="botonAgregarNegocio" type="button" class="btn btn-primary btn-lg btn-block" data-toggle="modal" data-target="#modalAgregarNegocio">Agregar Negocio</button>
		</div>
	</div>

	</br></br></br></br></br></br>

<?php

	 	$conexion = mysqli_connect ("localhost", "root", "481516") or die ("No se puede conectar con el servidor");		
		mysqli_select_db ($conexion,"crmpef") or die ("No se puede seleccionar la base de datos");		 
		mysqli_set_charset($conexion, "utf8");  
	 
	    $instruccion = "select * from producto" ;
	  	$consulta = mysqli_query ($conexion,$instruccion) or die ("Fallo en la consulta");
	    mysqli_close($conexion);

	   // Mostrar resultados de la consulta
	   $nfilas = mysqli_num_rows ($consulta);
	  // echo($nfilas); 


	?>

	<?php
									 for($i=0; $i<$nfilas; $i++)
									   {
									   	         $resultado = mysqli_fetch_array ($consulta);
									   	         echo $resultado.['nombre'];


									?>




	<div class="col-xs-12 col-md-12">
		



		
		<div class="col-xs-2 col-md-2">
			Idea

			<div class="rectanguloNegocio">
				Nombre del negocio
			</div>

		</div>
		<div class="col-xs-2 col-md-2">
			Contacto

			<div class="rectanguloNegocio">
				Nombre del negocio
			</div>

		</div>
		<div class="col-xs-2 col-md-2">
			Necesidad

			<div class="rectanguloNegocio">
				Nombre del negocio
			</div>

		</div>
		<div class="col-xs-2 col-md-2">
			Propuesta

			<div class="rectanguloNegocio">
				Nombre del negocio
			</div>

		</div>
		<div class="col-xs-2 col-md-2">
			Negociación

			<div class="rectanguloNegocio">
				Nombre del negocio
			</div>

		</div>
	
		
	</div>

</div>