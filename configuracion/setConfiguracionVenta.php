<?php



$data = json_decode(file_get_contents('php://input'));
print (json_encode($data));

$idusuario = mysql_real_escape_string($data->idusuario);
$descuento = mysql_real_escape_string($data->descuento);

mysql_connect("localhost", "root", "481516") or die(mysql_error()); 
mysql_select_db("crmpef") or die(mysql_error()); 


mysql_query("UPDATE `configuracionVenta` SET descuento='$descuento' WHERE idusuario='$idusuario'");

//echo (json_encode($data));
Print "Your information has been updated to the database."; 


?>