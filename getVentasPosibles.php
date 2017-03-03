<?php

$data = (file_get_contents("php://input"));
$vendedor = $data;
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
    $query = "SELECT * FROM `venta`, `contacto` WHERE  venta.idcontacto = contacto.idContacto   &&  venta.status = 'En proceso' && venta.idvendedor = '$vendedor' "; 
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
        $status=$row['status'];
        $idvendedor=$row['idvendedor'];



        //echo 'This is: ' . $name . ' ' . $description . "<br/>\n"
        $arr[] = array('id' => $id, 'nombre' => $nombre, 'etapa' =>
            $etapa, 'contacto'=> $contacto, 'total'=> $total, 'fechaCierre' => $fechaCierre,'status'=>$status,'idvendedor'=>$idvendedor) ;
    } 

    //echo $arr;
    echo json_encode($arr);
?>