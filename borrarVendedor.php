<?php

$data = json_decode(file_get_contents('php://input'));
$user = mysql_real_escape_string($data->user);
echo $user;



mysql_connect("localhost", "root", "481516") or die(mysql_error()); 
mysql_select_db("crmpef") or die(mysql_error()); 


mysql_query("UPDATE `Usuario` SET idGrupo=NULL WHERE user='$user'");


Print "Your information has been updated to the database."; 




?> 
