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

        $query = "
                SELECT COUNT(*) AS cont, 
                DAY(fechaRegistro) AS dia
                FROM `contacto`
                WHERE MONTH(fechaRegistro)= $mes && YEAR(fechaRegistro)=$annio && idvendedor='$idtipo'
                GROUP BY DAY(fechaRegistro)
                ORDER BY DAY(fechaRegistro) ASC  ;
                "; 

            $result = mysql_query($query) OR die(mysql_error()); 

            $arr = array();
            while ($row = mysql_fetch_array($result)) { 
                $sep=$row['dia'];
                $cont=$row['cont'];
                $arr[] = array('sep' => $sep, 'cont' => $cont) ;
            } 


            echo json_encode($arr);

      

    }
    if($mes==0 && $annio!=0){
        //para el año actual y el personaliado de solo el año

         //select
        $query = "
            SELECT COUNT(*) AS cont, 
                         MONTH(fechaRegistro) AS mes
                FROM `contacto`
               WHERE YEAR(fechaRegistro)= $annio && idvendedor='$idtipo'
            GROUP BY MONTH(fechaRegistro)
            ORDER BY MONTH(fechaRegistro) ASC  ;
            "; 

        $result = mysql_query($query) OR die(mysql_error()); 

        $arr = array();
        while ($row = mysql_fetch_array($result)) { 
            $sep=$row['mes'];
            $cont=$row['cont'];
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

             $query = " Select COUNT(*) as cont, DAY(fechaRegistro) as dia From `contacto` Where {fn week(fechaRegistro)}= $week 
             && idvendedor='$idtipo' GROUP BY DAY(fechaRegistro) ORDER BY DAY(fechaRegistro) ASC ;";
           

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
                DAY(contacto.fechaRegistro) AS dia
                FROM `contacto`,`Usuario`
                WHERE MONTH(contacto.fechaRegistro)= $mes && YEAR(contacto.fechaRegistro)=$annio && Usuario.idGrupo= $idtipo && contacto.idvendedor=Usuario.user
                GROUP BY DAY(contacto.fechaRegistro)
                ORDER BY DAY(contacto.fechaRegistro) ASC  ;
                "; 
              
        $result = mysql_query($query) OR die(mysql_error()); 

        $arr = array();
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
                         MONTH(fechaRegistro) AS mes
                FROM `contacto`,`Usuario`
               WHERE YEAR(fechaRegistro)= $annio && Usuario.idGrupo=$idtipo && contacto.idvendedor=Usuario.user
            GROUP BY MONTH(fechaRegistro)
            ORDER BY MONTH(fechaRegistro) ASC  ;
            "; 

        $result = mysql_query($query) OR die(mysql_error()); 

        $arr = array();
        while ($row = mysql_fetch_array($result)) { 
            $sep=$row['mes'];
            $cont=$row['cont'];
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

             $query = " Select COUNT(*) as cont, DAY(fechaRegistro) as dia From `contacto`,`Usuario` Where {fn week(fechaRegistro)}= $week
             && Usuario.idGrupo=$idtipo && contacto.idvendedor=Usuario.user  
             GROUP BY DAY(fechaRegistro) ORDER BY DAY(fechaRegistro) ASC ;";
           

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