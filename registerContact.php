<?php

ini_set('display_errors','off');
ini_set('display_startup_errors','off');
error_reporting(0);

$contactname = $_POST['NuevoContacto'];
$newpaterno = $_POST['NuevoPaterno'];
$newmaterno = $_POST['NuevoMaterno'];
$newpuesto = $_POST['NuevoPuesto'];
$newempresa = $_POST['NuevoEmpresa'];
$newtelefono = $_POST['NuevoTelefono'];
$newcelular = $_POST['NuevoCelular'];
$newmail = $_POST['NuevoCorreo'];
$newcumpleanos = $_POST['NuevoCumpleanos'];
$submit=$_POST['btnRegister'];
$session_login=true;
$isregistered = false;


function Conectarse(){
	if(!($link=mysql_connect("localhost","root"))){
		echo "Error conectando a la base de datos.";
		exit();
	}
	if(!mysql_select_db("usuarios",$link)){
		echo "Error seleccionando la base de datos.";
		exit();
	}
	return $link;
}


$con = Conectarse();
$queryreg = "INSERT INTO contacto (nombre, apellidoPaterno, apellidoMaterno, puesto, empresa, telefono, celular, correo, cumpleanos) VALUES ('".$contactname."','".$newpaterno."','".$newmaterno."','".$newpuesto."','".$newempresa."','".$newtelefono."','".$newcelular."','".$newmail."','".$newcumpleanos."')";

try{
		$q3=mysql_query($queryreg,$con);
		echo"Usario Registrado Correctamente";

}catch(Exception $error){}

mysql_close($con);

?>