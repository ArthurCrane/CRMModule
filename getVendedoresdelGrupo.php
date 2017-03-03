<?php

$data = json_decode(file_get_contents("php://input"));
$idgerente = mysql_real_escape_string($data);

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
              //SELECT * FROM `login`,`grupo` WHERE grupo.idGerente = 'isabella' && grupo.idGrupo = login.idGrupo 
    $query = "SELECT login.nombre as nombre ,login.mail as mail FROM `usuario`,`grupo` WHERE grupo.idGerente = 'isabella' && grupo.idGrupo = usuario.idGrupo "; 
    $result = mysql_query($query) OR die(mysql_error()); 

    $arr = array();

    //now we turn the results into an array and loop through them. 
    while ($row = mysql_fetch_array($result)) { 
        $nombre=$row['nombre'];
        $mail=$row['mail'];
     

        //echo 'This is: ' . $name . ' ' . $description . "<br/>\n"
        $arr[] = array('nombre' => $nombre, 'mail' =>
            $mail) ;
    } 

    //echo $arr;
    echo json_encode($arr);
?>