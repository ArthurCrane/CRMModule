<?php

$data = json_decode(file_get_contents('php://input'));
print (json_encode($data));

$idusuario = mysql_real_escape_string($data->idusuario);
$puesto = mysql_real_escape_string($data->puesto);
$telefonoSecretaria = mysql_real_escape_string($data->telefonoSecretaria);
$nombreSecretaria = mysql_real_escape_string($data->nombreSecretaria);
$telefonoOficina = mysql_real_escape_string($data->telefonoOficina);
$hobbies = mysql_real_escape_string($data->hobbies);
$estadoCivil = mysql_real_escape_string($data->estadoCivil);
$preferencias = mysql_real_escape_string($data->preferencias);
$personalidad = mysql_real_escape_string($data->personalidad);
$anotaciones = mysql_real_escape_string($data->anotaciones);
$domicilio =mysql_real_escape_string($data->domicilio);


mysql_connect("localhost", "root", "481516") or die(mysql_error()); 
mysql_select_db("crmpef") or die(mysql_error()); 


mysql_query("UPDATE `configuracionContacto` SET puesto='$puesto',telefonoSecretaria='$telefonoSecretaria',nombreSecretaria='$nombreSecretaria', telefonoOficina='$telefonoOficina', hobbies= '$hobbies',estadoCivil='$estadoCivil' , preferencias='$preferencias', anotaciones='$anotaciones', 
	personalidad= '$personalidad', domicilio ='$domicilio' WHERE idusuario='$idusuario'");

//echo (json_encode($data));
Print "Your information has been updated to the database."; 


?>