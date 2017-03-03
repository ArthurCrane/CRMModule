<?php

ini_set('display_errors','off');
ini_set('display_startup_errors','off');
error_reporting(0);

$user = $_POST['user'];
$contrasena=md5(($_POST['contrasena']));
$session_login=true;

function Conectarse(){
	if(!($link=mysql_connect("localhost","root","481516"))){
		echo "Error conectando a la base de datos.";
		exit();
	}
	if(!mysql_select_db("crmpef",$link)){
		echo "Error seleccionando la base de datos.";
		exit();
	}
	return $link;
}

$con = Conectarse();
$query= "SELECT * FROM Usuario WHERE user='".$user."'AND contrasena ='".$contrasena."'";
$q = mysql_query($query,$con);
try{
	if(mysql_result($q,0)){
		$result = mysql_result($q,0);
		echo "Usuario correcto";
	}else{
		echo "Usuario Incorrecto" ; 
	} 
}catch(Exception $error){}

mysql_close($con);

echo "dos";

?>


