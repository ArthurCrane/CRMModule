<?php

$data = json_decode(file_get_contents("php://input"));
//print (json_encode($data));

$idvendedor = mysql_real_escape_string($data->idvendedor);

 $host = "localhost"; 
    $user = "root"; 
    $pass = "481516"; 
    $database = "crmpef";
    $con = mysql_connect($host,$user,$pass);
    if (!$con) {
        die('Could not connect: ' . mysql_error());
    }

    mysql_select_db($database,$con);  


    $query = "SELECT id, fechaCierre, status , nombre, total, contacto.nombreContacto as contacto FROM `venta` , `contacto` WHERE 
     venta.idvendedor='$idvendedor' && venta.idcontacto = contacto.idContacto && status = 'Cerrada Ganada'  ORDER BY fechaCierre DESC"; 
    $result = mysql_query($query) OR die(mysql_error()); 

    $arr = array();
    //now we turn the results into an array and loop through them. 
    while ($row = mysql_fetch_array($result)) { 
        $id=$row['id'];        
        $fecha=$row['fechaCierre'];
        $status=$row['status'];        
        $nombre=$row['nombre'];     
        $total=$row['total']; 
        $contacto=$row['contacto'];

        //echo 'This is: ' . $name . ' ' . $description . "<br/>\n"
        $arr[] = array( 'id' => $id, 'fecha'=> $fecha,'status' => $status, 'idvendedor' => $idvendedor, 'nombre'=>$nombre,'total'=>$total,'contacto'=> $contacto) ;
    } 

    //echo $arr;
    echo json_encode($arr);





?>