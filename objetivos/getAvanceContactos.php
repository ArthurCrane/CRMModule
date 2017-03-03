<?php

$data = json_decode(file_get_contents("php://input"));
$tipo = mysql_real_escape_string($data->tipo);
$idtipo = mysql_real_escape_string($data->idtipo);
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

if($tipo=="vendedor"){

    if($mes!=0){
        //pasa el del mes actual y el personalizado mes-año

        $query = "
                SELECT COUNT(*) AS cont
                FROM `contacto`
                WHERE MONTH(fechaRegistro)= $mes && YEAR(fechaRegistro)=$annio && idvendedor='$idtipo'
              ;
                "; 

            $result = mysql_query($query) OR die(mysql_error()); 

            $arr = array();
            while ($row = mysql_fetch_array($result)) { 
                $cont=$row['cont'];
                $arr[] = array('cont' => $cont) ;
            } 


            echo json_encode($arr);

      

    }else{
        //para el año actual y el personaliado de solo el año

         //select
        $query = "
            SELECT COUNT(*) AS cont
                FROM `contacto`
               WHERE YEAR(fechaRegistro)= $annio && idvendedor='$idtipo'
           
            "; 

        $result = mysql_query($query) OR die(mysql_error()); 

        $arr = array();
        while ($row = mysql_fetch_array($result)) { 
            $cont=$row['cont'];
            $arr[] = array( 'cont' => $cont) ;
        } 
        echo json_encode($arr);

    }

}

if($tipo=="grupo"){
     if($mes!=0){
        //pasa el del mes actual y el personalizado mes-año

           
        $query = "
                SELECT COUNT(*) AS cont
                FROM `contacto`,`Usuario`
                WHERE MONTH(contacto.fechaRegistro)= $mes && YEAR(contacto.fechaRegistro)=$annio && Usuario.idGrupo= $idtipo && contacto.idvendedor=Usuario.user
                 ;
                "; 
              
        $result = mysql_query($query) OR die(mysql_error()); 

        $arr = array();
        while ($row = mysql_fetch_array($result)) { 
            $cont=$row['cont'];
            $arr[] = array( 'cont' => $cont) ;
        } 
        echo json_encode($arr);




    }else{
        //para del año actual y el personaliado de solo el año
       $query = "
            SELECT COUNT(*) AS cont
                FROM `contacto`,`Usuario`
               WHERE YEAR(fechaRegistro)= $annio && Usuario.idGrupo=$idtipo && contacto.idvendedor=Usuario.user
         ;
            "; 

        $result = mysql_query($query) OR die(mysql_error()); 

        $arr = array();
        while ($row = mysql_fetch_array($result)) { 
            $cont=$row['cont'];
            $arr[] = array( 'cont' => $cont) ;
        } 
        echo json_encode($arr);




    }


}




?>