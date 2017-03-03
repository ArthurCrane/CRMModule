<?php

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
    $query = "SELECT * FROM `Usuario` WHERE  idGrupo is NULL && tipo!= 'admin'" ; 
    $result = mysql_query($query) OR die(mysql_error()); 

    $arr = array();
    
    //now we turn the results into an array and loop through them. 
    while ($row = mysql_fetch_array($result)) { 
        
        $user=$row['user'];      
        $nombre=$row['nombre'];    

                   
        $arr[] = array('user' => $user, 'nombre' => $nombre );

    } 


    echo json_encode($arr);






?>