<?php



$data = json_decode(file_get_contents('php://input'));
print (json_encode($data));

$idusuario = mysql_real_escape_string($data->idusuario);
$propiedades = mysql_real_escape_string($data->propiedades);
$existencias = mysql_real_escape_string($data->existencias);
$imagen=mysql_real_escape_string($data->imagen);

mysql_connect("localhost", "root", "481516") or die(mysql_error()); 
mysql_select_db("crmpef") or die(mysql_error()); 

echo $propiedades;
echo $existencias;
echo $imagen;
mysql_query("UPDATE `configuracionProducto` SET propiedades='$propiedades', existencias='$existencias', imagen='$imagen' WHERE idusuario='$idusuario'");

//echo (json_encode($data));
Print "Your information has been updated to the database."; 


?>