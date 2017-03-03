<?php

    $data = json_decode(file_get_contents("php://input"));
    $idContacto = mysql_real_escape_string($data->id);
  

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
    $query = "SELECT * FROM `contacto` WHERE idContacto=$idContacto"; 
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
        $imagen=$row['imagen'];
        $hobbies=$row['hobbies'];
        $preferencias=$row['preferencias'];
        $estadoCivil=$row['estadoCivil'];
        $personalidad=$row['personalidad'];

     
        $c = array('idContacto' => $id, 'nombreContacto' => $nombre, 'puesto'=> $puesto, 'empresa'=>$empresa, 'telefono'=>$telefono ,
            'celular'=> $celular, 'correo'=> $correo,'fechaNacimiento'=>$fechaNacimiento,'anotaciones'=> $anotaciones, 'imagen' => $imagen,
            'hobbies'=> $hobbies, 'preferencias'=>$preferencias, 'estadoCivil'=> $estadoCivil, 'personalidad'=>$personalidad);

    } 


    echo json_encode($c);

?>