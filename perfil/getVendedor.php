
<?php

$data = json_decode(file_get_contents('php://input'));

$idvendedor = mysql_real_escape_string($data->idvendedor);

mysql_connect("localhost", "root", "481516") or die(mysql_error()); 
mysql_select_db("crmpef") or die(mysql_error()); 
//$contrasena=md5(($_POST['contrasena']));



    $query = "SELECT * FROM `Usuario` WHERE user='$idvendedor'"; 
    $result = mysql_query($query) OR die(mysql_error()); 

    $arr = array();
   

    //now we turn the results into an array and loop through them. 
    while ($row = mysql_fetch_array($result)) { 
        $usuario=$row['user'];
        $nombre=$row['nombre'];
        $mail=$row['mail'];
        $contrasena=$row['contrasena'];
        $tipo=$row['tipo'];
        $imagen=$row['imagen'];
        $fechaNacimiento=$row['fechaNacimiento'];
       // $fechaNacimiento['fechaNacimiento'];
    

        //echo 'This is: ' . $name . ' ' . $description . "<br/>\n"
        $arr[] = array('user' => $usuario, 'nombre'=> $nombre, 'mail'=> $mail, 'contrasena' => $contrasena,'tipo'=>$tipo,'imagen'=> $imagen, 'fechaNacimiento'=> $fechaNacimiento) ;
    } 


    echo json_encode($arr);

?> 
