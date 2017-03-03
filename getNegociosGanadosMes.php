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
           //select
        $query = "
            SELECT COUNT(*) AS cont, 
            DAY(fechaCierre) AS dia
            FROM venta
            WHERE MONTH(fechaCierre)= 4 && idvendedor='$idvendedor' && (status='Cerrada Ganada')
            GROUP BY DAY(fechaCierre)
            ORDER BY DAY(fechaCierre) ASC  ;
            "; 
        $result = mysql_query($query) OR die(mysql_error()); 

        $arr = array();       
        while ($row = mysql_fetch_array($result)) { 
            $dia=$row['dia'];
            $cont=$row['cont'];       
          
            $arr[] = array( 'dia' => $dia,  'cont'=> $cont) ;
        } 



    }
    if($tipo=="annio"){

               //select
        $query = "
            SELECT COUNT(*) AS cont, 
              MONTH(fechaCierre) AS mes
                FROM venta
               WHERE YEAR(fechaCierre)= 2016 && idvendedor='$idvendedor' && (status='Cerrada Ganada')
            GROUP BY MONTH(fechaCierre)
            ORDER BY MONTH(fechaCierre) ASC  ;
            "; 
        $result = mysql_query($query) OR die(mysql_error()); 

        $arr = array();
       
        //now we turn the results into an array and loop through them. 
        while ($row = mysql_fetch_array($result)) { 
            //$id=$row['id'];
            $mes=$row['mes'];
            $cont=$row['cont'];       
          



            //echo 'This is: ' . $name . ' ' . $description . "<br/>\n"
            $arr[] = array( 'mes' => $mes,  'cont'=> $cont) ;
        } 


    }

  
    //echo $arr;
    echo json_encode($arr);


?>