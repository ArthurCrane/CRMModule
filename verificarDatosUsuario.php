<?php


$data = json_decode(file_get_contents("php://input"));
$nombre = mysql_real_escape_string($data->nombre);
$usuario = mysql_real_escape_string($data->usuario);
$correo = mysql_real_escape_string($data->correo);
$contrasena = md5(mysql_real_escape_string($data->contrasena));



mysql_connect("localhost", "root", "481516") or die(mysql_error()); 
mysql_select_db("crmpef") or die(mysql_error()); 


$checkuser = "SELECT * FROM  Usuario WHERE user='".$usuario."'";
$checkmail = "SELECT * FROM  Usuario WHERE mail='".$correo."'";
$q1 = mysql_query($checkuser);
$q2 = mysql_query($checkmail);
$error="";


try{
	if(mysql_num_rows($q1)!=0 || mysql_num_rows($q2)!=0)
	{
		if(mysql_num_rows($q1)!=0)			
			$error="1";
		if(mysql_num_rows($q2)!=0)			
			$error=$error."2";
		echo $error;
	}
	


}catch(Exception $error){}





?> 

