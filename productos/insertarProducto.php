<?php


$data = json_decode(file_get_contents("php://input"));
$nombreProducto = mysql_real_escape_string($data->nombreProducto);
$precio = mysql_real_escape_string($data->precio);
$descripcion = mysql_real_escape_string($data->descripcion);
$existencias = mysql_real_escape_string($data->existencias);
$propiedades=mysql_real_escape_string($data->propiedades);
$imagen=mysql_real_escape_string($data->imagen);


mysql_connect("localhost", "root", "481516") or die(mysql_error()); 
//echo "se conecto exitosamente";
mysql_select_db("crmpef") or die(mysql_error()); 
mysql_query("INSERT INTO producto (nombreProducto , precio,descripcion, existencias,propiedades,imagen) VALUES 
	('$nombreProducto', $precio , '$descripcion',$existencias,'$propiedades','$imagen')"); 

$query = "SELECT * FROM `producto` WHERE nombreProducto='$nombreProducto' && precio=$precio && descripcion='$descripcion'"; 
$result = mysql_query($query) OR die(mysql_error()); 

    $arr = array();

    //now we turn the results into an array and loop through them. 
    while ($row = mysql_fetch_array($result)) { 
        $idProducto=$row['idProducto'];
        $nombreProducto = $row['nombreProducto']; 
        $descripcion = $row['descripcion']; 
        $precio=$row['precio'];
        $existencias=$row['existencias'];
        $propiedades=$row['propiedades'];
        $imagen=$row['imagen'];
        //echo 'This is: ' . $name . ' ' . $description . "<br/>\n"
        $arr[] = array('idProducto' => $idProducto, 'nombreProducto' => $nombreProducto, 'descripcion' =>
            $descripcion, 'precio' => $precio,'existencias'=>$existencias,'propiedades'=>$propiedades,'imagen'=>$imagen);
    } 

  
    echo json_encode($arr);






?> 