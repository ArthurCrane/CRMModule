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
$fechaRegistro=mysql_real_escape_string($data->fechaRegistro);


mysql_connect("localhost", "root", "481516") or die(mysql_error()); 
//echo "se conecto exitosamente";
mysql_select_db("crmpef") or die(mysql_error()); 

if($tipo=="Personal"){
		mysql_query("INSERT INTO objetivo (tipo , cantidad,fechaInicio,fechaTerminacion,anotaciones,fechaRegistro) VALUES 
		('$tipoObjetivo', $cantidad, '$fechaInicio' , '$fechaTerminacion','$anotaciones','$fechaRegistro') ;"); 
		$query="SELECT idObjetivo FROM objetivo ORDER BY idObjetivo DESC LIMIT 1;";  
    	$result = mysql_query($query) OR die(mysql_error()); 
  	 	$arr = array();
    
	    while ($row = mysql_fetch_array($result)) { 
	        $idObjetivo=$row['idObjetivo'];
	                            
	        $arr[] = array('idObjetivo'=> $idObjetivo  );
	    } 
			   		
	    mysql_query("INSERT INTO objetivoPersonal (idObjetivo,idVendedor) VALUES ($idObjetivo,'$idtipo')");


}

if($tipo=="Grupal"){
		mysql_query("INSERT INTO objetivo (tipo , cantidad,fechaInicio,fechaTerminacion,anotaciones,fechaRegistro) VALUES 
		('$tipoObjetivo', $cantidad, '$fechaInicio' , '$fechaTerminacion','$anotaciones','$fechaRegistro') ;"); 
		$query="SELECT idObjetivo FROM objetivo ORDER BY idObjetivo DESC LIMIT 1;";  
    	$result = mysql_query($query) OR die(mysql_error()); 
  	 	$arr = array();
    
	    while ($row = mysql_fetch_array($result)) { 
	        $idObjetivo=$row['idObjetivo'];
	                            
	        $arr[] = array('idObjetivo'=> $idObjetivo  );
	    } 
			   		
	    mysql_query("INSERT INTO objetivoGrupal (idObjetivo,idGrupo) VALUES ($idObjetivo,$idtipo)");




}

if($tipo=="Individual"){
		mysql_query("INSERT INTO objetivo (tipo , cantidad,fechaInicio,fechaTerminacion,anotaciones,fechaRegistro) VALUES 
		('$tipoObjetivo', $cantidad, '$fechaInicio' , '$fechaTerminacion','$anotaciones','$fechaRegistro') ;"); 
		$query="SELECT idObjetivo FROM objetivo ORDER BY idObjetivo DESC LIMIT 1;";  
    	$result = mysql_query($query) OR die(mysql_error()); 
	  	$arr = array();
	    
	    while ($row = mysql_fetch_array($result)) { 
	        $idObjetivo=$row['idObjetivo'];
	                            
	        $arr[] = array('idObjetivo'=> $idObjetivo  );
	    } 		   		
		 mysql_query("INSERT INTO objetivoGerente (idObjetivo,idGerente,idVendedor) VALUES ($idObjetivo,'$idgerente','$idtipo')");


}



  
    echo json_encode($arr);











?> 
