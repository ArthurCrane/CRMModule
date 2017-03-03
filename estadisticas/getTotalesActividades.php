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
        //para el del mes actual y el personalizado mes-año
 
        $query = "
            SELECT COUNT(*) AS cont, 
            DAY(fecha) AS dia
            FROM `actividad`, `venta`
            WHERE MONTH(fecha)= $mes && YEAR(fecha)=$annio && venta.idvendedor='$idtipo' && actividad.status = 'Completada' && actividad.idventa = venta.id 
            GROUP BY DAY(fecha)
            ORDER BY DAY(fecha) ASC  ;
            "; 

            $result = mysql_query($query) OR die(mysql_error()); 

            $arr = array();
            //now we turn the results into an array and loop through them. 
            while ($row = mysql_fetch_array($result)) { 

                $sep=$row['dia'];
                $cont=$row['cont'];

                //echo 'This is: ' . $name . ' ' . $description . "<br/>\n"
                $arr[] = array('sep' => $sep, 'cont' => $cont) ;

            }
            echo json_encode($arr);

    }
    if($mes==0 && $annio !=0){
        //para el año actual y el personaliado de solo el año


         $query = "
        SELECT COUNT(*) AS cont, 
                     MONTH(fecha) AS mes
            FROM `actividad`, `venta`
           WHERE YEAR(fecha)= $annio && venta.idvendedor='$idtipo' && actividad.status = 'Completada' && actividad.idventa = venta.id 
        GROUP BY MONTH(fecha)
        ORDER BY MONTH(fecha) ASC  ;
        "; 

        $result = mysql_query($query) OR die(mysql_error()); 

        $arr = array();
        //now we turn the results into an array and loop through them. 
        while ($row = mysql_fetch_array($result)) { 
            $sep=$row['mes'];
            $cont=$row['cont'];

            //echo 'This is: ' . $name . ' ' . $description . "<br/>\n"
            $arr[] = array('sep' => $sep, 'cont' => $cont) ;
        } 
            echo json_encode($arr);

    }

    if($mes==0 && $annio ==0){
        date_default_timezone_set('America/Mexico_City');
        $datee = date('m/d/Y h:i:s a', time());
        //echo $datee;
        $date = new DateTime($datee);
        $week = $date->format("W");
       // echo "Weeknummer: $week";


         $query = " Select COUNT(*) as cont, DAY(fecha) as dia From `Actividad`,`venta` Where {fn week(fecha)}= $week && venta.idvendedor='$idtipo' && actividad.status ='Completada' 
         && actividad.idventa=venta.id GROUP BY DAY(fecha) ORDER BY DAY(fecha) ASC ;";
       

        $result = mysql_query($query) OR die(mysql_error()); 

        $arr = array();
        //now we turn the results into an array and loop through them. 
        while ($row = mysql_fetch_array($result)) { 
            $sep=$row['dia'];
            $cont=$row['cont'];

            //echo 'This is: ' . $name . ' ' . $description . "<br/>\n"
            $arr[] = array('sep' => $sep, 'cont' => $cont) ;
        } 
            echo json_encode($arr);





    }

}

if($tipo=="grupo"){
     if($mes!=0){
        //pasa el del mes actual y el personalizado mes-año

         $query = "
            SELECT COUNT(*) AS cont, 
            DAY(fecha) AS dia
            FROM `actividad`, `venta`,`Usuario`
            WHERE MONTH(actividad.fecha)= $mes && YEAR(actividad.fecha)=$annio && venta.idvendedor=Usuario.user && Usuario.idGrupo=$idtipo && actividad.status = 'Completada' && actividad.idventa = venta.id 
            GROUP BY DAY(actividad.fecha)
            ORDER BY DAY(actividad.fecha) ASC  ;
            "; 

        $result = mysql_query($query) OR die(mysql_error()); 
        $arr = array();
        //now we turn the results into an array and loop through them. 
        while ($row = mysql_fetch_array($result)) { 
            $sep=$row['dia'];
            $cont=$row['cont'];
            $arr[] = array('sep' => $sep, 'cont' => $cont) ;
        } 
            echo json_encode($arr);
    }
    if($mes==0 && $annio!=0){
        //para del año actual y el personaliado de solo el año


         $query = "
        SELECT COUNT(*) AS cont, 
                     MONTH(fecha) AS mes
            FROM `actividad`, `venta`,`Usuario`
           WHERE YEAR(fecha)= $annio && venta.idvendedor=Usuario.user && Usuario.idGrupo =$idtipo && actividad.status = 'Completada' && actividad.idventa = venta.id 
        GROUP BY MONTH(fecha)
        ORDER BY MONTH(fecha) ASC  ;
        "; 

        $result = mysql_query($query) OR die(mysql_error()); 

        $arr = array();
        //now we turn the results into an array and loop through them. 
        while ($row = mysql_fetch_array($result)) { 
            $sep=$row['mes'];
            $cont=$row['cont'];

            //echo 'This is: ' . $name . ' ' . $description . "<br/>\n"
            $arr[] = array('sep' => $sep, 'cont' => $cont) ;
        } 
            echo json_encode($arr);
    }
    if($mes==0 && $annio==0){
            date_default_timezone_set('America/Mexico_City');
            $datee = date('m/d/Y h:i:s a', time());
            //echo $datee;
            $date = new DateTime($datee);
            $week = $date->format("W");
           // echo "Weeknummer: $week";
             $query = " Select COUNT(*) as cont, DAY(fecha) as dia From `Actividad`,`venta`,`Usuario` Where {fn week(fecha)}= $week && venta.idvendedor=Usuario.user
             &&  Usuario.idGrupo =$idtipo  && actividad.status = 'Completada' 
             && actividad.idventa=venta.id GROUP BY DAY(fecha) ORDER BY DAY(fecha) ASC ;";
           

            $result = mysql_query($query) OR die(mysql_error()); 

            $arr = array();
            //now we turn the results into an array and loop through them. 
            while ($row = mysql_fetch_array($result)) { 
                $sep=$row['dia'];
                $cont=$row['cont'];

                //echo 'This is: ' . $name . ' ' . $description . "<br/>\n"
                $arr[] = array('sep' => $sep, 'cont' => $cont) ;
            } 
                echo json_encode($arr);





    }


}




?>