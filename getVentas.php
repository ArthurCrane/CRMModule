<?php


$data = (file_get_contents("php://input"));
$idventa = mysql_real_escape_string($data);



    $host = "localhost"; 
    $user = "root"; 
    $pass = "481516"; 
    $database = "crmpef";
    $con = mysql_connect($host,$user,$pass);
    if (!$con) {
        die('Could not connect: ' . mysql_error());
    }

    mysql_select_db($database,$con);  


     //select
    $query = "SELECT * FROM `venta`, `contacto` WHERE venta.idcontacto = contacto.idContacto "; 
    $result = mysql_query($query) OR die(mysql_error()); 

    $arr = array();
   
    //now we turn the results into an array and loop through them. 
    while ($row = mysql_fetch_array($result)) { 
        $id=$row['id'];
        $nombre=$row['nombre'];
        $etapa=$row['etapa'];
        $contacto=$row['nombreContacto'];        
        $total=$row['total'];
        $fechaCierre=$row['fechaCierre'];
        $fechaRegistro=$row['fechaRegistro'];
        $status=$row['status'];
        $idvendedor=$row['idvendedor'];
        $descuento=$row['descuento'];
            $query2 = "SELECT producto.idProducto as idProducto, producto.nombreProducto as nombreProducto, detalleventa.cantidad as cantidad, producto.precio as precio  FROM `detalleventa`, `producto` WHERE detalleventa.idProducto = producto.idProducto && idVenta = $idventa "; 
            $result2 = mysql_query($query) OR die(mysql_error()); 
            $arr2 = array();           
            while ($row = mysql_fetch_array($result)) { 
                $idProducto=$row['idProducto'];
                $nombreProducto=$row['nombreProducto'];
                $cantidad=$row['cantidad'];
                $precio=$row['precio']; 

                $arr2[] = array('idProducto' => $idProducto, 'nombreProducto' => $nombreProducto, 'cantidad' => $cantidad, 'precio'=> $precio);
            }
            var $productos=$arr2;


        //echo 'This is: ' . $name . ' ' . $description . "<br/>\n"
        $arr[] = array('id' => $id, 'nombre' => $nombre, 'etapa' =>
            $etapa, 'contacto'=> $contacto,  'total'=> $total, 'fechaCierre' => $fechaCierre,
            'fechaRegistro'=> $fechaRegistro, 'status'=>$status,'idvendedor'=>$idvendedor,'descuento'=>$descuento,'productos'=> $productos) ;
    } 

    //echo $arr;
    echo json_encode($arr);
?>