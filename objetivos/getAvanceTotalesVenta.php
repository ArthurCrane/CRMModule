<?php

$data = json_decode(file_get_contents("php://input"));
$tipo = mysql_real_escape_string($data->tipo);
$idtipo = mysql_real_escape_string($data->idtipo);
$mes=mysql_real_escape_string($data->mes);
$annio=mysql_real_escape_string($data->annio);

    $host = "localhost"; 
    $user = "root"; 
    $pass = "481516"; 
    $database = "crmpef";
    $con = mysql_connect($host,$user,$pass);
    if (!$con) {
        die('Could not connect: ' . mysql_error());
    }

    mysql_select_db($database,$con);  

if($tipo=="vendedor"){

    if($mes!=0){
        //pasa el del mes actual y el personalizado mes-año
          $queryMes="
          SELECT SUM(total) AS total
            FROM venta
        WHERE MONTH(fechaCierre)= $mes && YEAR(fechaCierre)=$annio && idvendedor='$idtipo' && (status='Cerrada Ganada')
     ";   
        $result = mysql_query($queryMes) OR die(mysql_error()); 
        $arr = array();       
        //now we turn the results into an array and loop through them. 
        while ($row = mysql_fetch_array($result)) { 
            $total=$row['total'];  
            $arr[] = array(   'total'=> $total) ;
        } 
        echo json_encode($arr);

    }else{
        //para el año actual y el personaliado de solo el año

         $queryAnnio = "
        SELECT SUM(total) AS total
            FROM venta
           WHERE YEAR(fechaCierre)= $annio && idvendedor='$idtipo' && (status='Cerrada Ganada' )
        ;
        "; 
        $result = mysql_query($queryAnnio) OR die(mysql_error()); 
        $arr = array();       
        //now we turn the results into an array and loop through them. 
        while ($row = mysql_fetch_array($result)) { 
            $total=$row['total'];  
            $arr[] = array(   'total'=> $total) ;
        } 
        echo json_encode($arr);


    }

}

if($tipo=="grupo"){
     if($mes!=0){
        //pasa el del mes actual y el personalizado mes-año
           $queryMes="
            SELECT SUM(venta.total) AS total
            FROM venta,Usuario
        WHERE MONTH(fechaCierre)= $mes && YEAR(fechaCierre)=$annio  && Usuario.user=venta.idvendedor && Usuario.idGrupo = $idtipo && (venta.status='Cerrada Ganada')
           ";   

        $result = mysql_query($queryMes) OR die(mysql_error()); 
        $arr = array();       
        //now we turn the results into an array and loop through them. 
        while ($row = mysql_fetch_array($result)) { 
  
            $total=$row['total'];  
            $arr[] = array(  'total'=> $total) ;
        } 
        echo json_encode($arr);




    }else{
        //para del año actual y el personaliado de solo el año
            $queryAnnio = "
        SELECT SUM(venta.total) AS total
            FROM venta,Usuario
           WHERE YEAR(fechaCierre)= $annio && Usuario.user=venta.idvendedor  &&Usuario.idGrupo= $idtipo && (status='Cerrada Ganada')
          ;
        "; 
        $result = mysql_query($queryAnnio) OR die(mysql_error()); 
        $arr = array();       
        //now we turn the results into an array and loop through them. 
        while ($row = mysql_fetch_array($result)) { 
            $total=$row['total'];  
            $arr[] = array(   'total'=> $total) ;
        } 
        echo json_encode($arr);






    }


}


   
  




?>