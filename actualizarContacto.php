<?php

$data = json_decode(file_get_contents('php://input'));


print "Informacion";

print (json_encode($data));

print "informacion";

$idContacto = mysql_real_escape_string($data->idContacto);
$nombreContacto = mysql_real_escape_string($data->nombreContacto);
$puesto = mysql_real_escape_string($data->puesto);
$empresa = mysql_real_escape_string($data->empresa);
$telefono = mysql_real_escape_string($data->telefono);
$celular = mysql_real_escape_string($data->celular);
$correo = mysql_real_escape_string($data->correo);
$fechaNacimiento = mysql_real_escape_string($data->fechaNacimiento);
$anotaciones = mysql_real_escape_string($data->anotaciones);
$imagen= mysql_real_escape_string($data->imagen);



Print "antes de conectar";
mysql_connect("localhost", "root", "481516") or die(mysql_error()); 
mysql_select_db("crmpef") or die(mysql_error()); 


mysql_query("UPDATE `contacto` SET idContacto=$idContacto, nombreContacto='$nombreContacto', puesto='$puesto', empresa='$empresa',telefono='$telefono',celular='$celular',correo='$correo',
fechaNacimiento='$fechaNacimiento', anotaciones='$anotaciones',imagen='$imagen' WHERE idContacto=$idContacto");

//echo (json_encode($data));
Print "Your information has been updated to the database."; 

?> 
