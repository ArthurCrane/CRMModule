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


      //select
    $query = "SELECT Usuario.idGrupo as idGrupo, Grupo2.nombre as nombre, Grupo2.descripcion as descripcion, Grupo2.idGerente as idGerente FROM `Usuario`,`Grupo2` WHERE user = '$idvendedor' && Usuario.idGrupo = Grupo2.idGrupo"; 
    $result = mysql_query($query) OR die(mysql_error()); 

    $arr = array();
    
    //now we turn the results into an array and loop through them. 
    while ($row = mysql_fetch_array($result)) { 
        $idGrupo=$row['idGrupo'];
        $nombre=$row['nombre'];      
        $descripcion=$row['descripcion'];   
        $idGerente=$row['idGerente']; 

                   
        $arr[] = array('idGrupo' => $idGrupo, 'nombre' => $nombre,'descripcion'=>$descripcion,'idGerente'=>$idGerente);

    } 


    echo json_encode($arr);






?>