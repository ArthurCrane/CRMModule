<?php


$data = json_decode(file_get_contents("php://input"));
echo $data;
/*
$nombreContacto = mysql_real_escape_string($data->nombreContacto);
$puesto = mysql_real_escape_string($data->puesto);
$empresa = mysql_real_escape_string($data->empresa);
$telefono = mysql_real_escape_string($data->telefono);
$celular = mysql_real_escape_string($data->celular);
$correo = mysql_real_escape_string($data->correo);
$fechaNacimiento = mysql_real_escape_string($data->fechaNacimiento);
$anotaciones = mysql_real_escape_string($data->anotaciones);
$imagen= mysql_real_escape_string($data->imagen);
*/
/*
mysql_connect("localhost", "root", "481516") or die(mysql_error()); 

echo "se conecto exitosamente";
mysql_select_db("crmpef") or die(mysql_error()); 
mysql_query("INSERT INTO contactos (nombreContacto , puesto,empresa,telefono,celular,correo,fechaNacimiento,anotaciones,imagen) VALUES 
	('$nombreContacto', '$puesto','$empresa','$telefono','$celular','$correo','$fechaNacimiento' ,'$anotaciones','$imagen')"); 
Print "Your information has been successfully added to the database."; 


*/
?> 

