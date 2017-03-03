<?php

$data = json_decode(file_get_contents("php://input"));

$idvendedor = mysql_real_escape_string($data->idvendedor);

    $host = "localhost"; 
    $user = "root"; 
    $pass = "481516"; 
    $database = "crmpef";
    $con = mysql_connect($host,$user,$pass);
    if (!$con) {
        die('Could not connect: ' . mysql_error());
    }

    mysql_select_db($database,$con);  


      $query = "
            SELECT COUNT(*) AS cont
            FROM venta
            WHERE idvendedor='$idvendedor' && (status='Cerrada Ganada')  ;
            "; 

            $result = mysql_query($query) OR die(mysql_error()); 

            $arr = array();
            //now we turn the results into an array and loop through them. 
            while ($row = mysql_fetch_array($result)) { 
                $cont=$row['cont'];

                //echo 'This is: ' . $name . ' ' . $description . "<br/>\n"
                $arr[] = array('cont' => $cont) ;

            }
            echo json_encode($arr);

  




?>