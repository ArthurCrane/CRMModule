<?php


$data = json_decode(file_get_contents("php://input"));

$idgerente = mysql_real_escape_string($data->idgerente);
$idgrupo=mysql_real_escape_string($data->idgrupo);
$mes=mysql_real_escape_string($data->mes);
$annio=mysql_real_escape_string($data->annio);


    $host = "localhost"; 
    $user = "root"; 
    $pass = "481516"; 
    $database = "crmpef";
    $con = mysql_connect($host,$user,$pass);
    if (!$con) {
        die('Could not connect: ' . mysql_error());
    }

    mysql_select_db($database,$con);  

    if($mes==0){

    $query="SELECT * FROM objetivo, objetivoGrupal WHERE objetivo.idObjetivo=objetivoGrupal.idObjetivo && objetivoGrupal.idGrupo=$idgrupo && YEAR(objetivo.fechaInicio)= $annio && YEAR(objetivo.fechaInicio) = $annio && YEAR(objetivo.fechaInicio) != YEAR(objetivo.fechaTerminacion) " ;

    }else{


    $query="SELECT * FROM objetivo, objetivoGrupal WHERE objetivo.idObjetivo=objetivoGrupal.idObjetivo && objetivoGrupal.idGrupo=$idgrupo && MONTH(objetivo.fechaInicio)= $mes && YEAR(objetivo.fechaInicio) = $annio && YEAR(objetivo.fechaTerminacion) = $annio";
    }

  
    $result = mysql_query($query) OR die(mysql_error()); 

    $arr = array();
    
    //now we turn the results into an array and loop through them. 
    while ($row = mysql_fetch_array($result)) { 
        $tipo=$row['tipo'];
        $cantidad=$row['cantidad'];            
        $total=$row['total'];           
        $arr[] = array('tipo'=> $tipo ,'cantidad' => $cantidad, 'total' => $total );
    } 


    echo json_encode($arr);





?>