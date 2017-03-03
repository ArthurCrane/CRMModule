<?php

$data = json_decode(file_get_contents('php://input'));


print "Informacion";

print (json_encode($data));

print "informacion";

$idProducto = mysql_real_escape_string($data->idProducto);
$existencias=mysql_real_escape_string($data->existencias);



Print "antes de conectar";
mysql_connect("localhost", "root", "481516") or die(mysql_error()); 
mysql_select_db("crmpef") or die(mysql_error()); 


mysql_query("UPDATE `producto` SET existencias=$existencias WHERE idProducto=$idProducto");

//echo (json_encode($data));
Print "Your information has been updated to the database."; 

?> 
