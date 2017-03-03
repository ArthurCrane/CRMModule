
<?php

$data = json_decode(file_get_contents('php://input'));


$usuario = mysql_real_escape_string($data->usuario);
$contrasena = md5(mysql_real_escape_string($data->contrasena));



mysql_connect("localhost", "root", "481516") or die(mysql_error()); 
mysql_select_db("crmpef") or die(mysql_error()); 
//$contrasena=md5(($_POST['contrasena']));



    $query = "SELECT * FROM `Usuario` WHERE user='".$usuario."'AND contrasena ='".$contrasena."'"; 
    $result = mysql_query($query) OR die(mysql_error()); 

    $arr = array();
   

    //now we turn the results into an array and loop through them. 
    while ($row = mysql_fetch_array($result)) { 
        $usuario=$row['user'];
        $contrasena=$row['contrasena'];
        $tipo=$row['tipo'];

        //echo 'This is: ' . $name . ' ' . $description . "<br/>\n"
        $arr[] = array('usuario' => $usuario, 'contrasena' => $contrasena,'tipo'=>$tipo) ;
    } 

//echo "arreglo";
//echo array_values($arr)[0]['usuario'];
    if(count($arr)!=0){
        session_start();
        $_SESSION['usuario']=$arr[0]['usuario'];
       // echo $_SESSION['usuario'];

    }


    //echo $arr;
    echo json_encode($arr);

?> 

