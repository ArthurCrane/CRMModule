<?php

ini_set('display_errors','off');
ini_set('display_startup_errors','off');
error_reporting(0);

$newname = $_POST['NuevoNombre'];
$newuser = $_POST['NuevoUser'];
$newmail = $_POST['NuevoCorreo'];
$newpassword=md5(($_POST['NuevaContrasena']));
$submit=$_POST['btnRegister'];
$session_login=true;
$isregistered = false;


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
$checkuser = "SELECT * FROM  Usario WHERE user='".$newuser."'";
$checkmail = "SELECT * FROM  Usuario WHERE mail='".$newmail."'";
$queryreg = "INSERT INTO Usuario (nombre, user, contrasena, mail) VALUES ('".$newname."', '".$newuser."','".$newpassword."','".$newmail."')";
$q1 = mysql_query($checkuser,$con);
$q2 = mysql_query($checkmail,$con);
try{
	if(mysql_result($q1,0)){
		echo"Éste usuario ya existe en la base de datos.<a href='index.html'>Haz click aquí para regresar.</a>";
	}else if(mysql_result($q2,0)){
		echo "Este correo ya está registrado en el sistema. <a href='index.html'>Haz click aquí para regresar.</a>"; 
	}
	else{
		$q3=mysql_query($queryreg,$con);
		echo"Usario Registrado Correctamente";
	}

}catch(Exception $error){}

mysql_close($con);

?>