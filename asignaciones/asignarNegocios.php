<?php


$data = json_decode(file_get_contents("php://input"));
$idvendedor = mysql_real_escape_string($data->idvendedor);
$negocios = ($data->negocios);


mysql_connect("localhost", "root", "481516") or die(mysql_error()); 
echo "se conecto exitosamente";
mysql_select_db("crmpef") or die(mysql_error()); 


 $cont=0;
	    while($cont< count($negocios)){
	    	$id= ($negocios[$cont]->id);
			mysql_query("UPDATE `venta` SET idvendedor='$idvendedor' WHERE id=$id");
	    	$cont++;
	    }
			   		



?> 