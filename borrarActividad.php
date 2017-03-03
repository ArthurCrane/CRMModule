<?php

$data = json_decode(file_get_contents('php://input'));



$id = mysql_real_escape_string($data->id);


print $id;

mysql_connect("localhost", "root", "481516") or die(mysql_error()); 
mysql_select_db("crmpef") or die(mysql_error()); 


mysql_query("DELETE FROM `actividad` WHERE id=$id");

//echo (json_encode($data));
Print "Your information has been deleted to the database."; 

?> 
