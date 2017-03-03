<?php


$data = json_decode(file_get_contents("php://input"));
$nombre = mysql_real_escape_string($data->nombre);
$usuario = mysql_real_escape_string($data->usuario);
$correo = mysql_real_escape_string($data->correo);
$contrasena = md5(mysql_real_escape_string($data->contrasena));
$imagen=mysql_real_escape_string($data->imagen);



mysql_connect("localhost", "root", "481516") or die(mysql_error()); 
mysql_select_db("crmpef") or die(mysql_error()); 


$checkuser = "SELECT * FROM Usuario WHERE user='".$usuario."'";
$checkmail = "SELECT * FROM  Usuario WHERE mail='".$correo."'";
$queryreg = "INSERT INTO Usuario (nombre, user, contrasena, mail,imagen) VALUES ('".$nombre."', '".$usuario."','".$contrasena."','".$correo."','".$imagen."')";
$queryinsertConfigContactos="INSERT INTO configuracionContacto (idUsuario,puesto,nombreSecretaria,telefonoSecretaria,telefonoOficina,hobbies,anotaciones,
	preferencias,estadoCivil,personalidad,domicilio) VALUES ('$usuario',0,0,0,0,0,0,0,0,0,0) ";
$queryinsertConfigProductos="INSERT INTO configuracionproducto (idusuario, propiedades,existencias,imagen) VALUES ('$usuario',0,0,0) ";
$queryinsertConfigVentas="INSERT INTO configuracionusuario (idusuario,imagen,fechaNacimiento) VALUES ('$usuario',0,0)";
$queryinsertConfigUsuario="INSERT INTO configuracionventa (idusuario,descuento) VALUES ('$usuario',0)";

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
	else
	{
		$q3=mysql_query($queryreg);
		$q4=mysql_query($queryinsertConfigContactos);
		$q5=mysql_query($queryinsertConfigProductos);
		$q6=mysql_query($queryinsertConfigUsuario);
		$q7=mysql_query($queryinsertConfigVentas);
		echo "3";


	}


}catch(Exception $error){}





?> 

