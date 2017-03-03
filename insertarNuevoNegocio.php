<?php


$data = json_decode(file_get_contents("php://input"));
$idvendedor = mysql_real_escape_string($data->idvendedor);
$idcontacto = mysql_real_escape_string($data->idcontacto);
$productos = ($data->productos);
$nombre = mysql_real_escape_string($data->nombre);
$etapa = mysql_real_escape_string($data->etapa);
$total= mysql_real_escape_string($data->total);
$status=mysql_real_escape_string($data->status);
$fechaRegistro=mysql_real_escape_string($data->fechaRegistro);
 //echo json_encode($data);

echo "Productos:";
echo json_encode($productos);



echo $status;
mysql_connect("localhost", "root", "481516") or die(mysql_error()); 
echo "se conecto exitosamente";
mysql_select_db("crmpef") or die(mysql_error()); 
mysql_query("INSERT INTO venta (idvendedor , idcontacto,nombre,etapa,total,status,fechaRegistro) VALUES 
	('$idvendedor', $idcontacto , '$nombre' , '$etapa',$total,'$status','$fechaRegistro')"); 
Print "Your information has been successfully added to the database."; 

$query="SELECT id FROM venta ORDER BY id DESC LIMIT 1;";  
$result = mysql_query($query) OR die(mysql_error()); 
$arr = array();
    
	    while ($row = mysql_fetch_array($result)) { 
	        $id=$row['id'];	                            
	        $arr[] = array('id'=> $id  );

	    } 
	    $cont=0;
	    while($cont< count($productos)){
	    	$idProducto= ($productos[$cont]->idProducto);
	    	$cantidad=($productos[$cont]->cantidad);
	    	$existencias=($productos[$cont]->existencias);

	    	mysql_query("INSERT INTO detalleVenta (idVenta,idProducto,cantidad) VALUES ($id,$idProducto,$cantidad)");
			mysql_query("UPDATE `producto` SET existencias=$existencias WHERE idProducto=$idProducto");

	    	$cont++;
	    }
			   		










?> 