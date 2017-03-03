<?php

$data = json_decode(file_get_contents("php://input"));
$tipo = mysql_real_escape_string($data->tipo);
$idtipo = mysql_real_escape_string($data->idtipo);
$mes=mysql_real_escape_string($data->mes);
$annio=mysql_real_escape_string($data->annio);


$status='Completada';
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

            $queryMes = "
            SELECT tipo, COUNT(*) AS cont                    
            FROM `actividad`,`venta`
            WHERE  MONTH(actividad.fecha) = $mes && YEAR(actividad.fecha) = $annio && actividad.idventa=venta.id && actividad.status='$status' && venta.idvendedor='$idtipo'
            GROUP BY actividad.tipo ;    ";

 
            $result = mysql_query($queryMes) OR die(mysql_error()); 
            $arr = array();       
            //now we turn the results into an array and loop through them. 
            while ($row = mysql_fetch_array($result)) { 
                $tipo=$row['tipo'];
                $cont=$row['cont'];  
                $arr[] = array( 'tipo' => $tipo,  'cont'=> $cont) ;
            } 
            echo json_encode($arr);

    }else{
        //para el año actual y el personaliado de solo el año

            $queryAnnio = "
            SELECT tipo, COUNT(*) AS cont                    
            FROM `actividad`,`venta`
            WHERE   YEAR(actividad.fecha) = $annio && actividad.idventa=venta.id && actividad.status='$status' && venta.idvendedor='$idtipo'
            GROUP BY actividad.tipo ;    ";

            $result = mysql_query($queryAnnio) OR die(mysql_error()); 
            $arr = array();       
            //now we turn the results into an array and loop through them. 
            while ($row = mysql_fetch_array($result)) { 
                $tipo=$row['tipo'];
                $cont=$row['cont'];  
                $arr[] = array( 'tipo' => $tipo,  'cont'=> $cont) ;
            } 
            echo json_encode($arr);


    }

}

if($tipo=="grupo"){
     if($mes!=0){
        //pasa el del mes actual y el personalizado mes-año
           

            $queryMes = "
            SELECT actividad.tipo as tipo, COUNT(*) AS cont                    
            FROM `actividad`,`venta`,`Usuario`
            WHERE MONTH(actividad.fecha)= $mes && YEAR(actividad.fecha)=$annio && venta.idvendedor=Usuario.user && Usuario.idGrupo=$idtipo && actividad.status='$status' && actividad.idventa=venta.id 
            GROUP BY actividad.tipo ;    ";
          

        $result = mysql_query($queryMes) OR die(mysql_error()); 
        $arr = array();       
        //now we turn the results into an array and loop through them. 
        while ($row = mysql_fetch_array($result)) { 
            $tipo=$row['tipo'];
            $cont=$row['cont'];  
            $arr[] = array( 'tipo' => $tipo,  'cont'=> $cont) ;
        } 
        echo json_encode($arr);


    }else{
        //para del año actual y el personaliado de solo el año

          $queryAnnio = "
            SELECT actividad.tipo as tipo, COUNT(*) AS cont                    
            FROM `actividad`,`venta`,`Usuario`
            WHERE YEAR(actividad.fecha) = $annio && venta.idvendedor = Usuario.user && Usuario.idGrupo = $idtipo &&  actividad.status='$status' && actividad.idventa=venta.id 
            GROUP BY actividad.tipo ;    ";


        $result = mysql_query($queryAnnio) OR die(mysql_error()); 
        $arr = array();       
        //now we turn the results into an array and loop through them. 
        while ($row = mysql_fetch_array($result)) { 
            $tipo=$row['tipo'];
            $cont=$row['cont'];  
            $arr[] = array( 'tipo' => $tipo,  'cont'=> $cont) ;
        } 
        echo json_encode($arr);






    }


}


   
  




?>