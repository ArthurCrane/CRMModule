<?php


$data = json_decode(file_get_contents("php://input"));
$idvendedor = mysql_real_escape_string($data->idvendedor);
$contactos = ($data->contactos);


mysql_connect("localhost", "root", "481516") or die(mysql_error()); 
echo "se conecto exitosamente";
mysql_select_db("crmpef") or die(mysql_error()); 


 $cont=0;
	    while($cont< count($contactos)){
	    	$idContacto= ($contactos[$cont]->idContacto);
			mysql_query("UPDATE `contacto` SET idvendedor='$idvendedor' WHERE idContacto='$idContacto'");
	    	$cont++;
	    }
			   		



?> 