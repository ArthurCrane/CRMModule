<?php


$data = json_decode(file_get_contents("php://input"));
//print (json_encode($data));

$idvendedor = mysql_real_escape_string($data->idvendedor);
$diaActual=mysql_real_escape_string($data->diaActual);



 $host = "localhost"; 
    $user = "root"; 
    $pass = "481516"; 
    $database = "crmpef";
    $con = mysql_connect($host,$user,$pass);
    if (!$con) {
        die('Could not connect: ' . mysql_error());
    }

    mysql_select_db($database,$con);  


    $query = "SELECT idContacto, nombreContacto FROM  `contacto` WHERE 
    idvendedor='$idvendedor' && MONTH(fechaNacimiento)= MONTH('$diaActual') && DAY(fechaNacimiento) = DAY ('$diaActual') "; 
    
 
    $result = mysql_query($query) OR die(mysql_error()); 

    $arr = array();
    //now we turn the results into an array and loop through them. 
    while ($row = mysql_fetch_array($result)) { 
        $idContacto=$row['idContacto'];
        $nombreContacto=$row['nombreContacto'];
    
      

        //echo 'This is: ' . $name . ' ' . $description . "<br/>\n"
        $arr[] = array( 'idContacto' => $idContacto, 'nombreContacto' => $nombreContacto) ;
    } 

    //echo $arr;
    echo json_encode($arr);





?>