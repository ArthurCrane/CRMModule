<?php

$data = json_decode(file_get_contents('php://input'));

$idGrupo = mysql_real_escape_string($data->idGrupo);

mysql_connect("localhost", "root", "481516") or die(mysql_error()); 
mysql_select_db("crmpef") or die(mysql_error()); 


mysql_query("DELETE FROM `Grupo2` WHERE idGrupo=$idGrupo");

//echo (json_encode($data));
Print "Your information has been deleted to the database."; 

?> 