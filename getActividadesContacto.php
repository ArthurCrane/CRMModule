<?php



$data = json_decode(file_get_contents("php://input"));
$idContacto = mysql_real_escape_string($data->idContacto);

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
    $query = "SELECT * FROM `actividad`,`venta` WHERE venta.id = actividad.idVenta && venta.idContacto = $idContacto && actividad.status = 'Completada' ORDER BY fecha DESC"; 
    $result = mysql_query($query) OR die(mysql_error()); 

    $arr = array();

    //now we turn the results into an array and loop through them. 
    while ($row = mysql_fetch_array($result)) { 
        $id=$row['id'];
        $tipo=$row['tipo'];
        $fecha=$row['fecha'];
        $hora=$row['hora'];
        $duracion=$row['duracion'];
        $anotaciones=$row['anotaciones'];
        $venta=$row['nombre'];

        //echo 'This is: ' . $name . ' ' . $description . "<br/>\n"
        $arr[] = array('id' => $id, 'tipo' =>
            $tipo, 'fecha' => $fecha, 'hora' => $hora, 'duracion' => $duracion, 'anotaciones' =>$anotaciones, 'venta'=>$venta) ;
    } 

    //echo $arr;
    echo json_encode($arr);
?>