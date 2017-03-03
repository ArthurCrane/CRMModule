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


    $query = "SELECT actividad.id as id, tipo,fecha, hora, venta.idvendedor as idvendedor, idventa, nombre, contacto.nombreContacto as contacto FROM `actividad` , `venta`, `contacto` WHERE 
    actividad.idventa=venta.id && venta.idcontacto=contacto.idContacto && venta.idvendedor='$idvendedor' &&  actividad.status = 'No completada' && ( fecha='$diaActual'  )"; 
    
 
    $result = mysql_query($query) OR die(mysql_error()); 

    $arr = array();
    //now we turn the results into an array and loop through them. 
    while ($row = mysql_fetch_array($result)) { 
        $id=$row['id'];
        $tipo=$row['tipo'];
        $hora=$row['hora'];
        $fecha=$row['fecha'];
        $idvendedor=$row['idvendedor'];
        $idventa=$row['idventa'];
        $nombre=$row['nombre'];
        $contacto=$row['contacto'];
      

        //echo 'This is: ' . $name . ' ' . $description . "<br/>\n"
        $arr[] = array( 'id' => $id, 'tipo' => $tipo, 'hora' => $hora, 'fecha'=>$fecha, 'idvendedor' =>
            $idvendedor, 'idventa'=> $idventa,'nombre'=>$nombre,'contacto'=>$contacto) ;
    } 

    //echo $arr;
    echo json_encode($arr);





?>