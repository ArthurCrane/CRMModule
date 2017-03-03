<?php


$data = json_decode(file_get_contents("php://input"));
$idgerente = mysql_real_escape_string($data->idgerente);
$idvendedor=mysql_real_escape_string($data->idvendedor);
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
        if($idgerente!=$idvendedor)
             $query="SELECT * FROM objetivo, objetivoGerente WHERE objetivo.idObjetivo=objetivoGerente.idObjetivo && objetivoGerente.idgerente='$idgerente' && objetivoGerente.idvendedor='$idvendedor'
             && YEAR(objetivo.fechaInicio)= $annio && YEAR(objetivo.fechaTerminacion) != YEAR(objetivo.fechaInicio)    ";
        else
            $query="SELECT * FROM objetivo, objetivoGerente WHERE objetivo.idObjetivo=objetivoGerente.idObjetivo  && objetivoGerente.idvendedor='$idvendedor'
             && YEAR(objetivo.fechaInicio)= $annio && YEAR(objetivo.fechaTerminacion) != YEAR(objetivo.fechaInicio)    ";

  
    }else{
        if($idgerente!=$idvendedor)
             $query="SELECT * FROM objetivo, objetivoGerente WHERE objetivo.idObjetivo=objetivoGerente.idObjetivo && objetivoGerente.idgerente='$idgerente' && objetivoGerente.idvendedor='$idvendedor' 
             && YEAR(objetivo.fechaTerminacion) = $annio &&   YEAR(objetivo.fechaInicio)= $annio && MONTH(objetivo.fechaInicio)= $mes     ";
        else
               $query="SELECT * FROM objetivo, objetivoGerente WHERE objetivo.idObjetivo=objetivoGerente.idObjetivo && objetivoGerente.idvendedor='$idvendedor' 
             && YEAR(objetivo.fechaTerminacion) = $annio &&   YEAR(objetivo.fechaInicio)= $annio && MONTH(objetivo.fechaInicio)= $mes     ";
    }


    $result = mysql_query($query) OR die(mysql_error()); 

    $arr = array();
    
    //now we turn the results into an array and loop through them. 
    while ($row = mysql_fetch_array($result)) { 
        $tipo=$row['tipo'];
        $cantidad=$row['cantidad'];                       
        $fechaInicio=$row['fechaInicio'];
        $fechaTerminacion=$row['fechaTerminacion'];    



        $total=$row['total'];         
        $arr[] = array('tipo'=> $tipo ,'cantidad' => $cantidad, 'fechaInicio'=> $fechaInicio, 'fechaTerminacion'=> $fechaTerminacion,'total'=> $total );
    } 


    echo json_encode($arr);





?>