<?php

$data = json_decode(file_get_contents('php://input'));
$idGrupo = mysql_real_escape_string($data->idGrupo);
$nombre = mysql_real_escape_string($data->nombre);
$descripcion = mysql_real_escape_string($data->descripcion);
echo $user;


mysql_connect("localhost", "root", "481516") or die(mysql_error()); 
mysql_select_db("crmpef") or die(mysql_error()); 


mysql_query("UPDATE `Grupo2` SET nombre='$nombre', descripcion='$descripcion' WHERE idGrupo=$idGrupo");


Print "Your information has been updated to the database."; 




?> 
