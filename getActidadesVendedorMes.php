<?php


$data = (file_get_contents("php://input"));
$idvendedor = mysql_real_escape_string($data);

    $host = "localhost"; 
    $user = "root"; 
    $pass = "481516"; 
    $database = "crmpef";
    $con = mysql_connect($host,$user,$pass);
    if (!$con) {
        die('Could not connect: ' . mysql_error());
    }

    mysql_select_db($database,$con);  

     //select
    $query = "
        SELECT COUNT(*) AS cont, 
                     MONTH(fecha) AS mes
            FROM `actividad`, `venta`
           WHERE YEAR(fecha)= 2016 && idvendedor='$idvendedor' && (actividad.idventa = venta.id)
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

    //echo $arr;
    echo json_encode($arr);
?>