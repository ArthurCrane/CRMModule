<?php



$d = (file_get_contents("php://input"));
$data=json_decode($d);
echo json_encode($data);

$nombreContacto = mysql_real_escape_string($data->nombreContacto);
$puesto = mysql_real_escape_string($data->puesto);
$empresa = mysql_real_escape_string($data->empresa);
$telefono = mysql_real_escape_string($data->telefono);
$celular = mysql_real_escape_string($data->celular);
$correo = mysql_real_escape_string($data->correo);
$fechaNacimiento = mysql_real_escape_string($data->fechaNacimiento);
$anotaciones = mysql_real_escape_string($data->anotaciones);
$imagen= mysql_real_escape_string($data->imagen);
$hobbies = mysql_real_escape_string($data->hobbies);
$preferencias = mysql_real_escape_string($data->preferencias);
$estadoCivil= mysql_real_escape_string($data->estadoCivil);
$personalidad= mysql_real_escape_string($data->personalidad);
$idvendedor=mysql_real_escape_string($data->idvendedor);
$fechaRegistro=mysql_real_escape_string($data->fechaRegistro);
$domicilio=mysql_real_escape_string($data->domicilio);
$nombreSecretaria=mysql_real_escape_string($data->nombreSecretaria);
$telefonoSecretaria=mysql_real_escape_string($data->telefonoSecretaria);


mysql_connect("localhost", "root", "481516") or die(mysql_error()); 
mysql_select_db("crmpef") or die(mysql_error()); 
//echo $d;
//checar si se encuentra

$query = "SELECT * FROM `contacto` WHERE nombreContacto='$nombreContacto' && correo='$correo'"; 
$result = mysql_query($query) OR die(mysql_error()); 

    $arr = array();
    $cont=0;
     while ($row = mysql_fetch_array($result)) { 
     	$cont=$cont+1;
	}
echo $cont;
	if($cont==0){
		//no existe en la bd
		mysql_query("INSERT INTO contacto (nombreContacto , puesto,empresa,telefono,celular,correo,fechaNacimiento,anotaciones,imagen,hobbies,preferencias,estadoCivil,personalidad,idvendedor,fechaRegistro) VALUES 
			('$nombreContacto', '$puesto','$empresa','$telefono','$celular','$correo','$fechaNacimiento' ,'$anotaciones','$imagen','$hobbies','$preferencias','$estadoCivil','$personalidad','$idvendedor','$fechaRegistro')"); 

		
		$query = "SELECT * FROM `contacto` WHERE nombreContacto='$nombreContacto' && celular='$celular' && correo='$correo'"; 
		$result = mysql_query($query) OR die(mysql_error()); 
		    $arr = array();
		    //now we turn the results into an array and loop through them. 
		    while ($row = mysql_fetch_array($result)) { 

		        $id=$row['idContacto'];
		        $nombre = $row['nombreContacto'];
		        $puesto=$row['puesto'];
		        $empresa=$row['empresa'];
		        $telefono=$row['telefono'];
		        $celular=$row['celular'];
		        $correo=$row['correo'];
		        $fechaNacimiento=$row['fechaNacimiento'];
		        $anotaciones=$row['anotaciones'];
		        $imagen=$row['imagen'];	
		        $hobbies=$row['hobbies'];
		        $preferencias=$row['preferencias'];
		        $estadoCivil=$row['estadoCivil'];
		        $personalidad=$row['personalidad'];	   
		        $domicilio=$row['domicilio'];  
		        $arr[] = array('idContacto' => $id, 'nombreContacto' => $nombre, 'puesto'=> $puesto, 'empresa'=>$empresa, 'telefono'=>$telefono ,
		            'celular'=> $celular, 'correo'=> $correo,'fechaNacimiento'=>$fechaNacimiento,'anotaciones'=> $anotaciones, 'imagen' => $imagen,
		            'hobbies'=>$hobbies,'preferencias'=>$preferencias,'estadoCivil'=>$estadoCivil,'personalidad'=>$personalidad);

	 	   } 		  
		    echo json_encode($arr);


	}else{
		//si existe en la bd
		$arr[0]="error";
		    echo json_encode($arr);
	}










?> 

