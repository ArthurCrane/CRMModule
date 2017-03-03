<?php

$data = json_decode(file_get_contents('php://input'));


print "Informacion";
print (json_encode($data));
print "informacion";

$id = mysql_real_escape_string($data->id);
$idvendedor = mysql_real_escape_string($data->idvendedor);
$idcontacto = mysql_real_escape_string($data->idcontacto);
$productos =($data->productos);
$nombre = mysql_real_escape_string($data->nombre);
$etapa = mysql_real_escape_string($data->etapa);
$total= mysql_real_escape_string($data->total);
$fechaCierre=mysql_real_escape_string($data->fechaCierre);
$status=mysql_real_escape_string($data->status);
$descuento=mysql_real_escape_string($data->descuento);


print $id;
print $etapa;
print $fechaCierre;


Print "antes de conectar";
mysql_connect("localhost", "root", "481516") or die(mysql_error()); 
mysql_select_db("crmpef") or die(mysql_error()); 

mysql_query("DELETE FROM `DetalleVenta` WHERE idventa=$id ");

$cont=0;
while(count($productos)>$cont){
	$idProducto=($productos[$cont]->idProducto);
	$cantidad=($productos[$cont]->cantidad);
	$existencias=($productos[$cont]->existencias);

	mysql_query("INSERT INTO `DetalleVenta` (idventa,idproducto,cantidad) VALUES ($id, $idProducto,$cantidad) ");
	mysql_query("UPDATE `producto` SET existencias=$existencias WHERE idProducto=$idProducto");

	$cont++;
}



//delete * detalleventa where idventa= $id && idproducto= (recorrer cada producto en while)

// insert in detalleventa  idventa =$ id && idproducto  (recorrer productos)

//modificar otros datos de la venta
mysql_query("UPDATE `venta` SET idcontacto=$idcontacto,  etapa='$etapa', total=$total,fechaCierre='$fechaCierre',status='$status',descuento='$descuento' WHERE id=$id");
//echo (json_encode($data));
Print "Your information has been updated to the database."; 




?> 
