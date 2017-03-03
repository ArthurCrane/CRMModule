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
    $query = "SELECT * FROM `configuracionProducto` WHERE idusuario = '$idusuario'"; 
    $result = mysql_query($query) OR die(mysql_error()); 

    $arr = array();
    
    //now we turn the results into an array and loop through them. 
    while ($row = mysql_fetch_array($result)) { 
        
        $idusuario=$row['idusuario'];
      

        if($row['propiedades']==1)
            $propiedades=true;
        else
            $propiedades=false;

         if($row['existencias']==1)
            $existencias=true;
        else
            $existencias=false;

        if($row['imagen']==1)
            $imagen=true;
        else
            $imagen=false;
                   
        $arr[] = array('idusuario' => $idusuario, 'propiedades' => $propiedades, 'existencias'=> $existencias,'imagen'=>$imagen);

    } 


    echo json_encode($arr);

?>