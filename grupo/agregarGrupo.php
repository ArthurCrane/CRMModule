<?php


$data = json_decode(file_get_contents("php://input"));
$nombre = mysql_real_escape_string($data->nombre);
$descripcion = mysql_real_escape_string($data->descripcion);
$idGerente = mysql_real_escape_string($data->idGerente);


mysql_connect("localhost", "root", "481516") or die(mysql_error()); 
//echo "se conecto exitosamente";
mysql_select_db("crmpef") or die(mysql_error()); 
mysql_query("INSERT INTO grupo2 (nombre , descripcion,idGerente) VALUES 
	('$nombre', '$descripcion' , '$idGerente')"); 

$query = "SELECT * FROM `grupo2` WHERE nombre='$nombre' && descripcion='$descripcion' && idGerente='$idGerente'"; 
$result = mysql_query($query) OR die(mysql_error()); 

    $arr = array();

    //now we turn the results into an array and loop through them. 
    while ($row = mysql_fetch_array($result)) { 
        $idGrupo=$row['idGrupo'];
        $nombre = $row['nombre']; 
        $descripcion = $row['descripcion']; 
        $idGerente=$row['idGerente'];
     
        //echo 'This is: ' . $name . ' ' . $description . "<br/>\n"
        $arr[] = array('idGrupo' => $idGrupo, 'nombre' => $nombre, 'descripcion' =>   $descripcion, 'idGerente' => $idGerente);
    } 

  
    echo json_encode($arr);











?> 

