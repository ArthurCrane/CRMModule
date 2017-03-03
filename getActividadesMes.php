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
            SELECT tipo, COUNT(*) AS cont                    
            FROM `actividad`,`venta`
            WHERE  MONTH(actividad.fecha) = 4 && actividad.idventa=venta.id && actividad.status='Completada' && venta.idvendedor='$idvendedor'
            GROUP BY actividad.tipo ;    "; 
            $result = mysql_query($query) OR die(mysql_error()); 
            $arr = array();
            while ($row = mysql_fetch_array($result)) { 
                $tipo=$row['tipo'];
                $cont=$row['cont'];
                $arr[] = array('tipo' => $tipo, 'cont' => $cont) ;
            } 
            $query2 = "
            SELECT tipo, COUNT(*) AS cont                    
                FROM `actividad`,`venta`
               WHERE MONTH(actividad.fecha)= 4 && actividad.idventa=venta.id && actividad.status='No Completada' && venta.idvendedor='$idvendedor'
            GROUP BY actividad.tipo ;    "; 

            $result = mysql_query($query2) OR die(mysql_error()); 
            $arr2 = array();
            while ($row = mysql_fetch_array($result)) { 
                $tipo=$row['tipo'];
                $cont=$row['cont'];
                $arr2[] = array('tipo' => $tipo, 'cont' => $cont) ;
            } 

            $arrays[0]=$arr;
            $arrays[1]=$arr2;
 



    }

    if($tipo=="annio"){

            $query = "
            SELECT tipo, COUNT(*) AS cont                    
            FROM `actividad`,`venta`
            WHERE actividad.idventa=venta.id && actividad.status='Completada' && venta.idvendedor='$idvendedor' && YEAR(actividad.fecha) = 2016
            GROUP BY actividad.tipo ;    "; 
            $result = mysql_query($query) OR die(mysql_error()); 
            $arr = array();
            while ($row = mysql_fetch_array($result)) { 
                $tipo=$row['tipo'];
                $cont=$row['cont'];
                $arr[] = array('tipo' => $tipo, 'cont' => $cont) ;
            } 
            $query2 = "
            SELECT tipo, COUNT(*) AS cont                    
                FROM `actividad`,`venta`
               WHERE actividad.idventa=venta.id && actividad.status='No Completada' && venta.idvendedor='$idvendedor' && YEAR(actividad.fecha) = 2016
            GROUP BY actividad.tipo ;    "; 

            $result = mysql_query($query2) OR die(mysql_error()); 
            $arr2 = array();
            while ($row = mysql_fetch_array($result)) { 
                $tipo=$row['tipo'];
                $cont=$row['cont'];
                $arr2[] = array('tipo' => $tipo, 'cont' => $cont) ;
            } 

            $arrays[0]=$arr;
            $arrays[1]=$arr2;
    }


    if($tipo=="semana"){


    }
   

    echo json_encode($arrays);

?>