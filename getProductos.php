<?php
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
    $query = "SELECT * FROM `producto` "; 
    $result = mysql_query($query) OR die(mysql_error()); 




    $arr = array();

    //now we turn the results into an array and loop through them. 
    while ($row = mysql_fetch_array($result)) { 
        $id=$row['idProducto'];
        $nombreProducto = $row['nombreProducto']; 
        $descripcion = $row['descripcion']; 
        $precio=$row['precio'];
        $propiedades=$row['propiedades'];
        $existencias=$row['existencias'];
        $imagen=$row['imagen'];
        //echo 'This is: ' . $name . ' ' . $description . "<br/>\n"
        $arr[] = array('idProducto' => $id, 'nombreProducto' => $nombreProducto, 'descripcion' =>
            $descripcion, 'precio' => $precio,'propiedades'=>$propiedades,'existencias'=>$existencias,'imagen'=>$imagen);
    } 

  
    echo json_encode($arr);
    
?>