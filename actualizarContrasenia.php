<?php

$data = json_decode(file_get_contents('php://input'));


print "Informacion";

print (json_encode($data));

print "informacion";

$idvendedor = mysql_real_escape_string($data->idvendedor);
$contrasena=md5(mysql_real_escape_string($data ->contrasena));


Print "antes de conectar";
mysql_connect("localhost", "root", "481516") or die(mysql_error()); 
mysql_select_db("crmpef") or die(mysql_error()); 


mysql_query("UPDATE `Usuario` SET contrasena='$contrasena' WHERE user='$idvendedor'");

//echo (json_encode($data));
Print "Your information has been updated to the database."; 

?> 
