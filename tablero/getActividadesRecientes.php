<?php


$data = json_decode(file_get_contents("php://input"));
//print (json_encode($data));

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


    $query = "SELECT actividad.id as id, tipo,fecha, actividad.status as status, hora, venta.idvendedor as idvendedor, idventa, nombre, actividad.anotaciones as anotaciones , contacto.nombreContacto as contacto FROM `actividad` , `venta`,`contacto` WHERE 
    actividad.idventa=venta.id && venta.idvendedor='$idvendedor' && contacto.idContacto= venta.idcontacto && actividad.status = 'Completada'  ORDER BY actividad.fecha DESC"; 
    $result = mysql_query($query) OR die(mysql_error()); 

    $arr = array();
    //now we turn the results into an array and loop through them. 
    while ($row = mysql_fetch_array($result)) { 
        $id=$row['id'];
        $status=$row['status'];
        $tipo=$row['tipo'];
        $hora=$row['hora'];
        $fecha=$row['fecha'];
        $idvendedor=$row['idvendedor'];
        $idventa=$row['idventa'];
        $nombre=$row['nombre'];
        $anotaciones=$row['anotaciones'];
        $contacto=$row['contacto'];
      

        //echo 'This is: ' . $name . ' ' . $description . "<br/>\n"
        $arr[] = array( 'id' => $id, 'status'=> $status,'tipo' => $tipo, 'hora' => $hora, 'fecha'=>$fecha, 'idvendedor' =>
            $idvendedor, 'idventa'=> $idventa,'nombre'=>$nombre,'anotaciones'=>$anotaciones,'contacto'=>$contacto) ;
    } 

    //echo $arr;
    echo json_encode($arr);





?>