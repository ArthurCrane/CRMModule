<?php

$data = json_decode(file_get_contents("php://input"));
//print (json_encode($data));

$idvendedor = mysql_real_escape_string($data->idvendedor);
$diaActual=mysql_real_escape_string($data->diaActual);



 $host = "localhost"; 
    $user = "root"; 
    $pass = "481516"; 
    $database = "crmpef";
    $con = mysql_connect($host,$user,$pass);
    if (!$con) {
        die('Could not connect: ' . mysql_error());
    }

    mysql_select_db($database,$con);  


    $query = "SELECT * FROM `objetivo`,`objetivopersonal`  WHERE 
    objetivopersonal.idVendedor='$idvendedor' && objetivo.idObjetivo = objetivopersonal.idObjetivo && 
     MONTH (objetivo.fechaInicio) =MONTH('$diaActual')  "; 
    $result = mysql_query($query) OR die(mysql_error()); 

    $arr = array();



    //now we turn the results into an array and loop through them. 
    while ($row = mysql_fetch_array($result)) { 
        $idObjetivo=$row['idObjetivo'];
        $fechaInicio=$row['fechaInicio'];
        $fechaTerminacion=$row['fechaTerminacion'];
        $tipo=$row['tipo'];
        $cantidad=$row['cantidad'];
        $total=$row['total'];
        $anotaciones=$row['anotaciones'];
        
      

        //echo 'This is: ' . $name . ' ' . $description . "<br/>\n"
        $arr[] = array( 'idObjetivo' => $idObjetivo, 'fechaInicio'=> $fechaInicio,'fechaTerminacion' => $fechaTerminacion, 
            'tipo' => $tipo, 'cantidad'=>$cantidad, 'total' =>
            $total, 'anotaciones'=> $anotaciones) ;
    } 

    //echo $arr;
    echo json_encode($arr);





?>