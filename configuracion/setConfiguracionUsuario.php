<?php



$data = json_decode(file_get_contents('php://input'));
print (json_encode($data));

$idusuario = mysql_real_escape_string($data->idusuario);
$imagen = mysql_real_escape_string($data->imagen);
$fechaNacimiento = mysql_real_escape_string($data->fechaNacimiento);


mysql_connect("localhost", "root", "481516") or die(mysql_error()); 
mysql_select_db("crmpef") or die(mysql_error()); 

mysql_query("UPDATE `configuracionUsuario` SET imagen='$imagen', fechaNacimiento='$fechaNacimiento' WHERE idusuario= '$idusuario' " );

//echo (json_encode($data));
Print "Your information has been updated to the database."; 


?>