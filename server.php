
<?php

//Php Code
//print_r("files");
$filename = $_FILES['file']['name'];
$destination = '../images/' . $filename;
move_uploaded_file( $_FILES['file']['tmp_name'] , $destination );






/*
if(!is_dir("uploads/"))
	mkdir("uploads/",0777);

if($file && move_uploaded_file($_FILES["file"]["tmp_name"], "uploads/" $file))
{
	echo $file;
}
*/
/*
$data = (file_get_contents("php://input"));


$file=$_FILES["archivo"]['tmp_name'];



//$file=$imagen;
if (file_exists($file))
{
echo "subiendo";
$miDirectorio = "uploads/";
$IDunico = time();
$nombre = $_FILES['archivo']['tmp_name']."_".$IDunico;
move_uploaded_file($_FILES['imagen']['tmp_name'],
$miDirectorio.$nombre);
echo "termina de subir";
}
else
echo "No se pudo subir el archivo <BR>";

*/

?>