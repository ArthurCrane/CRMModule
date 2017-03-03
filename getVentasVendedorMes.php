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
       $queryMes="
     SELECT SUM(total) AS total, 
            DAY(fechaCierre) AS dia
            FROM venta
        WHERE MONTH(fechaCierre)= 4 && idvendedor='gsanchez24' && (status='Cerrada Ganada' || status='Cerrada Perdida')
        GROUP BY DAY(fechaCierre)
        ORDER BY DAY(fechaCierre) ASC  ;";   
        $result = mysql_query($queryMes) OR die(mysql_error()); 
        $arr = array();       
        //now we turn the results into an array and loop through them. 
        while ($row = mysql_fetch_array($result)) { 
            $dia=$row['dia'];
            $total=$row['total'];  
            $arr[] = array( 'dia' => $dia,  'total'=> $total) ;
        } 
        echo json_encode($arr);


}
if($tipo=="annio"){
    $queryAnnio = "
        SELECT SUM(total) AS total, 
                     MONTH(fechaCierre) AS mes
            FROM venta
           WHERE YEAR(fechaCierre)= 2016 && idvendedor='$idvendedor' && (status='Cerrada Ganada' || status='Cerrada Perdida')
        GROUP BY MONTH(fechaCierre)
        ORDER BY MONTH(fechaCierre) ASC  ;
        "; 
        $result = mysql_query($queryAnnio) OR die(mysql_error()); 
        $arr = array();       
        //now we turn the results into an array and loop through them. 
        while ($row = mysql_fetch_array($result)) { 
            $mes=$row['mes'];
            $total=$row['total'];  
            $arr[] = array( 'mes' => $mes,  'total'=> $total) ;
        } 
        echo json_encode($arr);
}

if($tipo=="semana"){

    $querySemana="
        SELECT 
        SUM(`total`) as total,
        DAYNAME(FROM_UNIXTIME(fechaCierre)) as dia
        FROM venta WHERE idvendedor='$idvendedor' && (status='Cerrada Ganada' || status='Cerrada Perdida')
         && YEARWEEK(fechaCierre) = YEARWEEK(NOW())
        group by dia
        ORDER BY dia;
        ";
        $result = mysql_query($querySemana) OR die(mysql_error()); 
        $arr = array();       
        //now we turn the results into an array and loop through them. 
        while ($row = mysql_fetch_array($result)) { 
            $dia=$row['dia'];
            $total=$row['total'];  
            $arr[] = array( 'dia' => $dia,  'total'=> $total) ;
        } 
        echo json_encode($arr);








}
     //select
   
  




?>