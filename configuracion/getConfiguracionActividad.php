<?php

$data = json_decode(file_get_contents('php://input'));
$idusuario = mysql_real_escape_string($data->idusuario);


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
    $query = "SELECT * FROM `configuracionActividad` WHERE idUsuario = '$idusuario'"; 
    $result = mysql_query($query) OR die(mysql_error()); 

    $arr = array();
    
    //now we turn the results into an array and loop through them. 
    while ($row = mysql_fetch_array($result)) { 
        
        $idusuario=$row['idUsuario'];
        $tipoActividad=$row['tipoActividad'];      
     
         if($row['estaSeleccionado']==1)
            $estaSeleccionado=true;
        else
            $estaSeleccionado=false;

                   
        $arr[] = array('idusuario' => $idusuario, 'tipoActividad' => $tipoActividad, 'estaSeleccionado'=> $estaSeleccionado);

    } 


    echo json_encode($arr);

?>