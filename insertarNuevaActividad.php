<?php

date_default_timezone_set('America/Mexico_City');

$script_tz = date_default_timezone_get();

if (strcmp($script_tz, ini_get('date.timezone'))){
    echo 'La zona horaria del script difiere de la zona horaria de la configuracion ini.';
} else {
    echo 'La zona horaria del script y la zona horaria de la configuración ini coinciden.';
}

$data = json_decode(file_get_contents("php://input"));
echo (file_get_contents("php://input"));
$idventa = mysql_real_escape_string($data->idventa);
$status = mysql_real_escape_string($data->status);
$tipo = mysql_real_escape_string($data->tipo);
$hora = ($data->hora);
$duracion = mysql_real_escape_string($data->duracion);
$anotaciones = mysql_real_escape_string($data->anotaciones);
$fecha=mysql_real_escape_string($data->fecha);


echo "hora";
echo ($hora);


mysql_connect("localhost", "root", "481516") or die(mysql_error()); 
mysql_select_db("crmpef") or die(mysql_error()); 
mysql_query("INSERT INTO actividad (idventa,status,tipo,fecha,hora,duracion,anotaciones) VALUES 
	($idventa, '$status' , '$tipo','$fecha',  '$hora', $duracion,'$anotaciones')"); 



?> 

