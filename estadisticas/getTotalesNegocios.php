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
            DAY(fechaCierre) AS dia
            FROM venta
            WHERE MONTH(fechaCierre)= $mes && YEAR(fechaCierre)=$annio && idvendedor='$idtipo' && (status='Cerrada Ganada')
            GROUP BY DAY(fechaCierre)
            ORDER BY DAY(fechaCierre) ASC  ;
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


                  //select
        $query = "
            SELECT COUNT(*) AS cont, 
              MONTH(fechaCierre) AS mes
                FROM venta
               WHERE YEAR(fechaCierre)= $annio && idvendedor='$idtipo' && (status='Cerrada Ganada')
            GROUP BY MONTH(fechaCierre)
            ORDER BY MONTH(fechaCierre) ASC  ;
            "; 
        $result = mysql_query($query) OR die(mysql_error()); 
        $arr = array();       
        //now we turn the results into an array and loop through them. 
        while ($row = mysql_fetch_array($result)) { 
            //$id=$row['id'];
            $sep=$row['mes'];
            $cont=$row['cont'];  
            //echo 'This is: ' . $name . ' ' . $description . "<br/>\n"
            $arr[] = array( 'sep' => $sep,  'cont'=> $cont) ;
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
         $query = " Select COUNT(*) as cont, DAY(fechaCierre) as dia From `venta` Where {fn week(fechaCierre)}= $week 
            && idvendedor='$idtipo' && status='Cerrada Ganada' GROUP BY DAY(fechaCierre) ORDER BY DAY(fechaCierre) ASC ;";
       

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
            DAY(fechaCierre) AS dia
            FROM venta,Usuario
            WHERE MONTH(fechaCierre)= $mes && YEAR(fechaCierre)=$annio && venta.idvendedor=Usuario.user && Usuario.idGrupo= $idtipo && (status='Cerrada Ganada')
            GROUP BY DAY(fechaCierre)
            ORDER BY DAY(fechaCierre) ASC  ;
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
    if($mes==0 && $annio!=0){
        //para del año actual y el personaliado de solo el año

            $query = "
            SELECT COUNT(*) AS cont, 
              MONTH(fechaCierre) AS mes
                FROM venta, Usuario
               WHERE YEAR(fechaCierre)= $annio && venta.idvendedor=Usuario.user && Usuario.idGrupo = $idtipo && (status='Cerrada Ganada')
            GROUP BY MONTH(fechaCierre)
            ORDER BY MONTH(fechaCierre) ASC  ;
            "; 
        $result = mysql_query($query) OR die(mysql_error()); 
        $arr = array();       
        //now we turn the results into an array and loop through them. 
        while ($row = mysql_fetch_array($result)) { 
            //$id=$row['id'];
            $sep=$row['mes'];
            $cont=$row['cont'];  
            //echo 'This is: ' . $name . ' ' . $description . "<br/>\n"
            $arr[] = array( 'sep' => $sep,  'cont'=> $cont) ;
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


         $query = " Select COUNT(*) as cont, DAY(fechaCierre) as dia From `venta`,`Usuario` Where {fn week(fechaCierre)}= $week && 
        venta.idvendedor=Usuario.user && Usuario.idGrupo =$idtipo && status = 'Cerrada Ganada'  GROUP BY DAY(fechaCierre) ORDER BY DAY(fechaCierre) ASC ;";
       

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