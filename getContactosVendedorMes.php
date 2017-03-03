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
                DAY(fechaRegistro) AS dia
                FROM `contacto`
                WHERE MONTH(fechaRegistro)= 4 && idvendedor='$idvendedor'
                GROUP BY DAY(fechaRegistro)
                ORDER BY DAY(fechaRegistro) ASC  ;
                "; 

            $result = mysql_query($query) OR die(mysql_error()); 

            $arr = array();
            while ($row = mysql_fetch_array($result)) { 
                $dia=$row['dia'];
                $cont=$row['cont'];
                $arr[] = array('dia' => $dia, 'cont' => $cont) ;
            } 
    }

    if($tipo=="annio"){   
                 
         //select
        $query = "
            SELECT COUNT(*) AS cont, 
                         MONTH(fechaRegistro) AS mes
                FROM `contacto`
               WHERE YEAR(fechaRegistro)= 2016 && idvendedor='$idvendedor'
            GROUP BY MONTH(fechaRegistro)
            ORDER BY MONTH(fechaRegistro) ASC  ;
            "; 

        $result = mysql_query($query) OR die(mysql_error()); 

        $arr = array();
        while ($row = mysql_fetch_array($result)) { 
            $mes=$row['mes'];
            $cont=$row['cont'];
            $arr[] = array('mes' => $mes, 'cont' => $cont) ;
        } 


    }


    //echo $arr;
    echo json_encode($arr);
?>