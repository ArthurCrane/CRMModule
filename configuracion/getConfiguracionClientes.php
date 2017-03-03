<?php


$data = json_decode(file_get_contents('php://input'));
$idusuario = mysql_real_escape_string($data->idusuario);

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
    $query = "SELECT * FROM `configuracionContacto` WHERE idusuario = '$idusuario'"; 
    $result = mysql_query($query) OR die(mysql_error()); 

    $arr = array();
    
    //now we turn the results into an array and loop through them. 
    while ($row = mysql_fetch_array($result)) { 
        
        $idusuario=$row['idusuario'];      

        if($row['puesto']==1)   $puesto=true;    else    $puesto=false;

        if($row['domicilio']==1)   $domicilio=true;    else    $domicilio=false;


        if($row['telefonoSecretaria']==1)   $telefonoSecretaria=true;    else      $telefonoSecretaria=false;

        if($row['nombreSecretaria']==1)       $nombreSecretaria=true;     else        $nombreSecretaria=false;

        if($row['telefonoOficina']==1)        $telefonoOficina=true;      else        $telefonoOficina=false;

        if($row['hobbies']==1)       $hobbies=true;     else      $hobbies=false;

        if($row['anotaciones']==1)   $anotaciones=true;    else      $anotaciones=false;

        if($row['preferencias']==1)       $preferencias=true;     else        $preferencias=false;

        if($row['estadoCivil']==1)        $estadoCivil=true;      else        $estadoCivil=false;

        if($row['personalidad']==1)       $personalidad=true;     else      $personalidad=false;

                   
        $arr[] = array('idusuario' => $idusuario, 'puesto' => $puesto,'domicilio'=> $domicilio, 'telefonoSecretaria'=> $telefonoSecretaria, 'nombreSecretaria'=> $nombreSecretaria, 'telefonoOficina'=> $telefonoOficina, 'hobbies'=> $hobbies,'anotaciones'=> $anotaciones, 'preferencias'=> $preferencias, 'estadoCivil'=> $estadoCivil, 'personalidad'=> $personalidad );

    } 


    echo json_encode($arr);

?>