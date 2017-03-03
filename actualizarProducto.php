<?php

$data = json_decode(file_get_contents('php://input'));


print "Informacion";

print (json_encode($data));

print "informacion";

$idProducto = mysql_real_escape_string($data->idProducto);
$nombreProducto = mysql_real_escape_string($data->nombreProducto);
$precio = mysql_real_escape_string($data->precio);
$descripcion = mysql_real_escape_string($data->descripcion);



Print "antes de conectar";
mysql_connect("localhost", "root", "481516") or die(mysql_error()); 
mysql_select_db("crmpef") or die(mysql_error()); 


mysql_query("UPDATE `producto` SET idProducto=$idProducto, nombreProducto='$nombreProducto', precio=$precio, descripcion='$descripcion' WHERE idProducto=$idProducto");

//echo (json_encode($data));
Print "Your information has been updated to the database."; 

?> 
