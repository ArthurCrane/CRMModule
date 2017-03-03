
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


      $query = "
           SELECT contacto.idContacto as idContacto, contacto.nombreContacto as nombre, contacto.imagen as imagen, COUNT(*)as cont FROM `contacto`, `venta` WHERE venta.idContacto = contacto.idContacto &&  venta.status='Cerrada ganada' && contacto.idvendedor ='$idvendedor' GROUP BY contacto.nombreContacto


            "; 

            $result = mysql_query($query) OR die(mysql_error()); 

            $arr = array();
            //now we turn the results into an array and loop through them. 
            while ($row = mysql_fetch_array($result)) {
                $idContacto=$row['idContacto'];
            	$nombre=$row['nombre'];
                $cont=$row['cont'];
                $imagen=$row['imagen'];

                //echo 'This is: ' . $name . ' ' . $description . "<br/>\n"
                $arr[] = array('idContacto'=> $idContacto,'nombre'=>$nombre,'cont' => $cont,'imagen'=> $imagen) ;

            }
            echo json_encode($arr);

  




?>