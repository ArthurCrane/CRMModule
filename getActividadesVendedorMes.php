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
            SELECT COUNT(*) AS cont, 
            DAY(fecha) AS dia
            FROM `actividad`, `venta`
            WHERE MONTH(fecha)= 4 && venta.idvendedor='$idvendedor' && actividad.status = 'Completada' && actividad.idventa = venta.id 
            GROUP BY DAY(fecha)
            ORDER BY DAY(fecha) ASC  ;
            "; 

            $result = mysql_query($query) OR die(mysql_error()); 

            $arr = array();
            //now we turn the results into an array and loop through them. 
            while ($row = mysql_fetch_array($result)) { 
                $dia=$row['dia'];
                $cont=$row['cont'];

                //echo 'This is: ' . $name . ' ' . $description . "<br/>\n"
                $arr[] = array('dia' => $dia, 'cont' => $cont) ;
            } 

    }

    if($tipo=="annio"){
         $query = "
        SELECT COUNT(*) AS cont, 
                     MONTH(fecha) AS mes
            FROM `actividad`, `venta`
           WHERE YEAR(fecha)= 2016 && venta.idvendedor='$idvendedor' && actividad.status = 'Completada' && actividad.idventa = venta.id 
        GROUP BY MONTH(fecha)
        ORDER BY MONTH(fecha) ASC  ;
        "; 

        $result = mysql_query($query) OR die(mysql_error()); 

        $arr = array();
        //now we turn the results into an array and loop through them. 
        while ($row = mysql_fetch_array($result)) { 
            $mes=$row['mes'];
            $cont=$row['cont'];

            //echo 'This is: ' . $name . ' ' . $description . "<br/>\n"
            $arr[] = array('mes' => $mes, 'cont' => $cont) ;
        } 

    }
   

     //select
   
    //echo $arr;
    echo json_encode($arr);
?>