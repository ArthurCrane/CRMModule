<?php

$data = json_decode(file_get_contents("php://input"));
$idcontacto=mysql_real_escape_string($data->idcontacto);
$vendedorNuevo = mysql_real_escape_string($data->vendedorNuevo);
echo $vendedorNuevo;

mysql_connect("localhost", "root", "481516") or die(mysql_error()); 
echo "se conecto exitosamente";
mysql_select_db("crmpef") or die(mysql_error()); 



     //select
    $query = "SELECT * FROM `usuario` WHERE nombre = '$vendedorNuevo' "; 
    $result = mysql_query($query) OR die(mysql_error()); 


    $arr = array();

    while ($row = mysql_fetch_array($result)) { 
        $user=$row['user'];    
    } 



	mysql_query("UPDATE `contacto` SET idvendedor='$user' WHERE idContacto='$idcontacto'");
	



?> 