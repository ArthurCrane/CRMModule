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
    $query = "SELECT * FROM `venta` WHERE status = 'En proceso'"; 
    $result = mysql_query($query) OR die(mysql_error()); 

    $arr = array();

    //now we turn the results into an array and loop through them. 
    while ($row = mysql_fetch_array($result)) { 
        $id=$row['id'];
        $nombre=$row['nombre'];
        $etapa=$row['etapa'];
        
       

        //echo 'This is: ' . $name . ' ' . $description . "<br/>\n"
        $arr[] = array('id' => $id, 'nombre' => $nombre, 'etapa' =>
            $etapa) ;
    } 

    //echo $arr;
    echo json_encode($arr);
?>