<?php

$data = json_decode(file_get_contents("php://input"));
$idvendedor = mysql_real_escape_string($data->idvendedor);
$tipo = mysql_real_escape_string($data->tipo);

    $host = "localhost"; 
    $user = "root"; 
    $pass = "481516"; 
    $database = "crmpef";
    $con = mysql_connect($host,$user,$pass);
    if (!$con) {
        die('Could not connect: ' . mysql_error());
    }

    mysql_select_db($database,$con);  

    if($tipo=="mes"){
    $query = "
        SELECT status, COUNT(*) as cont, SUM(total) AS total                      
        FROM venta WHERE idvendedor='$idvendedor' && MONTH(fechaCierre)= 4
        GROUP BY status;";

    $result = mysql_query($query) OR die(mysql_error()); 
    $arr = array();  
    //now we turn the results into an array and loop through them. 
        while ($row = mysql_fetch_array($result)) { 
            $status=$row['status'];
            $cont=$row['cont'];
            $total=$row['total'];     
            $arr[] = array('status' => $status, 'cont' => $cont, 'total' =>
                $total) ;
        } 

    }
    if($tipo=="annio"){

           $query = "
            SELECT status, COUNT(*) as cont, SUM(total) AS total                      
            FROM venta WHERE idvendedor='$idvendedor' && YEAR(fechaCierre)= 2016
            GROUP BY status;";

        $result = mysql_query($query) OR die(mysql_error()); 
        $arr = array();  
        //now we turn the results into an array and loop through them. 
            while ($row = mysql_fetch_array($result)) { 
                $status=$row['status'];
                $cont=$row['cont'];
                $total=$row['total'];     
                $arr[] = array('status' => $status, 'cont' => $cont, 'total' =>
                    $total) ;
            } 

    

    }




    //echo $arr;
    echo json_encode($arr);


?>