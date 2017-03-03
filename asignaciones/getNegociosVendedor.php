<?php
$data = json_decode(file_get_contents("php://input"));
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


     //select
    $query = "SELECT venta.id,venta.nombre FROM `venta` WHERE
             venta.idvendedor = '$idvendedor' && venta.status= 'En proceso'"; 
    $result = mysql_query($query) OR die(mysql_error()); 

    $arr = array();
    
    //now we turn the results into an array and loop through them. 
    while ($row = mysql_fetch_array($result)) { 
        
        $id=$row['id'];
        $nombre = $row['nombre'];
     

     
        $arr[] = array('id' => $id, 'nombre' => $nombre);

    } 


    echo json_encode($arr);

?>