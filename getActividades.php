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
    $query = "SELECT * FROM `actividad` ORDER BY fecha"; 
    $result = mysql_query($query) OR die(mysql_error()); 

    $arr = array();
    //now we turn the results into an array and loop through them. 
    while ($row = mysql_fetch_array($result)) { 
        $id=$row['id'];
        $idventa=$row['idventa'];
        $tipo=$row['tipo'];
        $status=$row['status'];
        $fecha=$row['fecha'];
        $hora=$row['hora'];
        $duracion=$row['duracion'];
        $anotaciones=$row['anotaciones'];

        //echo 'This is: ' . $name . ' ' . $description . "<br/>\n"
        $arr[] = array('id' => $id, 'idventa' => $idventa, 'tipo' =>
            $tipo, 'status' => $status, 'fecha' => $fecha, 'hora' => $hora, 'duracion' => $duracion, 'anotaciones' =>$anotaciones) ;
    } 

    //echo $arr;
    echo json_encode($arr);
?>