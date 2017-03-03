<?php

date_default_timezone_set('America/Mexico_City');

$script_tz = date_default_timezone_get();

if (strcmp($script_tz, ini_get('date.timezone'))){
    echo 'La zona horaria del script difiere de la zona horaria de la configuracion ini.';
} else {
    echo 'La zona horaria del script y la zona horaria de la configuración ini coinciden.';
}




$data = json_decode(file_get_contents('php://input'));

print "Informacion";
print (json_encode($data));
print "informacion";

$id = mysql_real_escape_string($data->id);
$status = mysql_real_escape_string($data->status);
$tipo = mysql_real_escape_string($data->tipo);
$fecha = mysql_real_escape_string($data->fecha);
$hora = mysql_real_escape_string($data->hora);
$duracion = mysql_real_escape_string($data->duracion);
$anotaciones= mysql_real_escape_string($data->anotaciones);
echo ($data->hora);
echo $hora;
echo "Fecha*****";
echo $fecha;

print $id;

Print "antes de conectar";
mysql_connect("localhost", "root", "481516") or die(mysql_error()); 
mysql_select_db("crmpef") or die(mysql_error()); 


mysql_query("UPDATE `actividad` SET status='$status', tipo='$tipo', hora='$hora', duracion=$duracion, fecha='$fecha', anotaciones='$anotaciones' WHERE id=$id");

//echo (json_encode($data));
Print "Your information has been updated to the database."; 

?> 
