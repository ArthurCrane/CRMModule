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


    $query = "SELECT objetivo.idObjetivo as idObjetivo,fechaInicio,fechaTerminacion, tipo, cantidad, objetivogerente.idVendedor as idVendedor, objetivogerente.idGerente as idGerente FROM  `objetivo`, `objetivogerente` WHERE objetivo.idObjetivo = objetivogerente.idObjetivo &&
    idvendedor='$idvendedor' && MONTH(fechaRegistro)= MONTH('$diaActual') && DAY(fechaRegistro) = DAY ('$diaActual') GROUP BY objetivo.idObjetivo ";     
 
    $result = mysql_query($query) OR die(mysql_error()); 
    $arr = array();
    //now we turn the results into an array and loop through them. 
    while ($row = mysql_fetch_array($result)) { 
        $idObjetivo=$row['idObjetivo'];
        $tipo=$row['tipo'];
        $cantidad=$row['cantidad'];
        $fechaInicio=$row['fechaInicio'];
        $fechaTerminacion=$row['fechaTerminacion'];
        $idVendedor=$row['idVendedor'];
        $idGerente=$row['idGerente'];   


        //echo 'This is: ' . $name . ' ' . $description . "<br/>\n"
        $arr[] = array( 'idObjetivo' => $idObjetivo, 'tipo' => $tipo, 'cantidad'=> $cantidad,'fechaInicio'=> $fechaInicio, 'fechaTerminacion'=> $fechaTerminacion, 'idVendedor'=> $idVendedor, 'idGerente' => $idGerente) ;
    } 


    $query = "SELECT objetivo.idObjetivo as idObjetivo,fechaInicio,fechaTerminacion, objetivo.tipo as tipo, cantidad, objetivogrupal.idGrupo as idGrupo FROM  `objetivo`, `objetivogrupal`,`usuario` WHERE usuario.user='$idvendedor' && usuario.idGrupo = objetivogrupal.idGrupo && objetivo.idObjetivo = objetivogrupal.idObjetivo 
        && MONTH(fechaRegistro)= MONTH('$diaActual') && DAY(fechaRegistro) = DAY ('$diaActual') GROUP BY objetivo.idObjetivo "; 
    
 
    $result = mysql_query($query) OR die(mysql_error()); 

    $arr2 = array();
    //now we turn the results into an array and loop through them. 
    while ($row = mysql_fetch_array($result)) { 
        $idObjetivo=$row['idObjetivo'];
        $tipo=$row['tipo'];
        $cantidad=$row['cantidad'];
        $fechaInicio=$row['fechaInicio'];
        $fechaTerminacion=$row['fechaTerminacion'];
        $idGrupo=$row['idGrupo'];
    


        //echo 'This is: ' . $name . ' ' . $description . "<br/>\n"
        $arr2[] = array( 'idObjetivo' => $idObjetivo, 'tipo' => $tipo, 'cantidad'=> $cantidad,'fechaInicio'=> $fechaInicio, 'fechaTerminacion'=> $fechaTerminacion, 'idGrupo'=> $idGrupo) ;
        
    } 



    $query = "SELECT objetivo.idObjetivo as idObjetivo,fechaInicio,fechaTerminacion, objetivo.tipo as tipo, cantidad, objetivopersonal.idVendedor as idVendedor FROM  `objetivo`, `objetivopersonal` WHERE objetivopersonal.idVendedor='$idvendedor'  && objetivo.idObjetivo = objetivopersonal.idObjetivo 
        && MONTH(fechaRegistro)= MONTH('$diaActual') && DAY(fechaRegistro) = DAY ('$diaActual') GROUP BY objetivo.idObjetivo "; 
    
 
    $result = mysql_query($query) OR die(mysql_error()); 

    $arr3 = array();
    //now we turn the results into an array and loop through them. 
    while ($row = mysql_fetch_array($result)) { 
        $idObjetivo=$row['idObjetivo'];
        $tipo=$row['tipo'];
        $cantidad=$row['cantidad'];
        $fechaInicio=$row['fechaInicio'];
        $fechaTerminacion=$row['fechaTerminacion'];
        $idVendedor=$row['idVendedor'];
    


        //echo 'This is: ' . $name . ' ' . $description . "<br/>\n"
        $arr3[] = array( 'idObjetivo' => $idObjetivo, 'tipo' => $tipo, 'cantidad'=> $cantidad,'fechaInicio'=> $fechaInicio, 'fechaTerminacion'=> $fechaTerminacion, 'idVendedor'=> $idVendedor) ;
        
    } 










 $objetivos= array('gerente'=> $arr, 'grupales'=> $arr2,'personales'=>$arr3);







    //echo $arr;
    echo json_encode($objetivos);





?>