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
    $query = "SELECT * FROM `contacto` WHERE contacto.idVendedor = '$idvendedor' "; 
    $result = mysql_query($query) OR die(mysql_error()); 

    $arr = array();
    
    //now we turn the results into an array and loop through them. 
    while ($row = mysql_fetch_array($result)) { 
        
        $id=$row['idContacto'];
        $nombre = $row['nombreContacto'];
        $puesto=$row['puesto'];
        $empresa=$row['empresa'];
        $telefono=$row['telefono'];
        $celular=$row['celular'];
        $correo=$row['correo'];
        $fechaNacimiento=$row['fechaNacimiento'];
        $anotaciones=$row['anotaciones'];

     
        $arr[] = array('idContacto' => $id, 'nombreContacto' => $nombre, 'puesto'=> $puesto, 'empresa'=>$empresa, 'telefono'=>$telefono ,
            'celular'=> $celular, 'correo'=> $correo,'fechaNacimiento'=>$fechaNacimiento,'anotaciones'=> $anotaciones);

    } 


    echo json_encode($arr);

?>