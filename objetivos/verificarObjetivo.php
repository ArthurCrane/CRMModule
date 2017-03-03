<?php

$data = json_decode(file_get_contents("php://input"));
$tipo = mysql_real_escape_string($data->tipo);
$idgerente = mysql_real_escape_string($data->idgerente);
$idtipo = mysql_real_escape_string($data->idtipo);
$tipoObjetivo = mysql_real_escape_string($data->tipoObjetivo);
$cantidad = mysql_real_escape_string($data->cantidad);
$fechaInicio = mysql_real_escape_string($data->fechaInicio);
$fechaTerminacion = mysql_real_escape_string($data->fechaTerminacion);
$anotaciones=mysql_real_escape_string($data->anotaciones);

mysql_connect("localhost", "root", "481516") or die(mysql_error()); 
//echo "se conecto exitosamente";
mysql_select_db("crmpef") or die(mysql_error()); 

if($tipo=="Personal"){
	   $query="SELECT COUNT(*) as cont FROM objetivo, objetivoPersonal WHERE objetivo.idObjetivo=objetivoPersonal.idObjetivo 
	    && objetivoPersonal.idvendedor='$idtipo' &&
	    objetivo.tipo='$tipoObjetivo' && (  MONTH(objetivo.fechaInicio)=MONTH('$fechaInicio')  && YEAR(objetivo.fechaInicio) = YEAR('$fechaInicio')  ) 
		&& ( MONTH(objetivo.fechaTerminacion) = MONTH ('$fechaTerminacion') && YEAR(objetivo.fechaTerminacion) = YEAR ('$fechaTerminacion')  ); ";

	   $result = mysql_query($query) OR die(mysql_error()); 
	    $arr = array();    
	    //now we turn the results into an array and loop through them. 
	    while ($row = mysql_fetch_array($result)) { 
	        $cont=$row['cont']; 	     
	    }

	    if($cont>0){
	    	$error=1;

	    } else{
	    	$error=0;
	    }
	    	echo ($error);



}

if($tipo=="Grupal"){
		$query="SELECT COUNT(*) as cont FROM objetivo, objetivoGrupal WHERE objetivo.idObjetivo=objetivoGrupal.idObjetivo 
	    && objetivoGrupal.idGrupo='$idtipo' &&
	    objetivo.tipo='$tipoObjetivo' && (  MONTH(objetivo.fechaInicio)=MONTH('$fechaInicio')  && YEAR(objetivo.fechaInicio) = YEAR('$fechaInicio')  ) 
		&& ( MONTH(objetivo.fechaTerminacion) = MONTH ('$fechaTerminacion') && YEAR(objetivo.fechaTerminacion) = YEAR ('$fechaTerminacion')  ); ";

	   $result = mysql_query($query) OR die(mysql_error()); 
	    $arr = array();    
	    //now we turn the results into an array and loop through them. 
	    while ($row = mysql_fetch_array($result)) { 
	        $cont=$row['cont']; 	     
	    }

	    if($cont>0){
	    	$error=1;

	    } else{
	    	$error=0;
	    }
	    	echo ($error);




}

if($tipo=="Individual"){

		$query="SELECT COUNT(*) as cont FROM objetivo, objetivoGerente WHERE objetivo.idObjetivo=objetivoGerente.idObjetivo 
	    && objetivoGerente.idVendedor='$idtipo' && objetivoGerente.idGerente = '$idgerente' &&
	    objetivo.tipo='$tipoObjetivo' && (  MONTH(objetivo.fechaInicio)=MONTH('$fechaInicio')  && YEAR(objetivo.fechaInicio) = YEAR('$fechaInicio')  ) 
		&& ( MONTH(objetivo.fechaTerminacion) = MONTH ('$fechaTerminacion') && YEAR(objetivo.fechaTerminacion) = YEAR ('$fechaTerminacion')  ); ";

	   $result = mysql_query($query) OR die(mysql_error()); 
	    $arr = array();    
	    //now we turn the results into an array and loop through them. 
	    while ($row = mysql_fetch_array($result)) { 
	        $cont=$row['cont']; 	     
	    }

	    if($cont>0){
	    	$error=1;

	    } else{
	    	$error=0;
	    }
	    	echo ($error);



	

}



  











?> 
