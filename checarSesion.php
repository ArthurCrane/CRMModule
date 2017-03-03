<?php
  
    //echo $arr;
   // echo "consiguiendo sesion";

 $x=0;

session_start();

if (isset($_SESSION['usuario'])){


	echo $_SESSION['usuario'];


}else{
	echo "false";

}






?>
