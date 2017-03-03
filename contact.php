<?php
$hostname = "localhost";
$username = "root";
$password = "";
$databasename = "usuarios";

$connect = mysqli_connect($hostname, $username, $password, $databasename);
$query = "SELECT * FROM contactos";
$result1 = mysqli_query($connect, $query);
?>


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="../../favicon.ico">

    <title>Navbar Template for Bootstrap</title>

    <!-- Bootstrap core CSS -->
    <link href="../../dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <link href="../../assets/css/ie10-viewport-bug-workaround.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="navbar.css" rel="stylesheet">

    <!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
    <!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
    <script src="../../assets/js/ie-emulation-modes-warning.js"></script>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

        <script type="text/javascript">
<!--
    function toggle_visibility(id) {
       var e = document.getElementById(id);
       e.focus();
       if(e.style.display == 'block')
          e.style.display = 'none';
       else
          e.style.display = 'block';

    }
//-->
</script>
  </head>

  <body ng-controller="contactosController">
  <div id="popupContact" class="popup-position">
    <div id="popup-wrapper">
    <p style="text-align:right;"><a href="javascript:void(0)" onclick="toggle_visibility('popupContact');">X</a> </p>
      <div method="post" id="popup-container">
      <form id="usuarioRegistro" action="registerContact.php" class="form-register" method="post" id="contactForm">
          <h3 class="form-signin-heading">Registro de Contacto</h3>
        <input type="text" id="inputNewName" class="form-register" placeholder="Nombre" name="NuevoContacto" required autofocus>
        <input type="text" id="inputPaterno" class="form-register" placeholder="Apellido Paterno" name="NuevoPaterno" required > 
        <input type="text" id="inputMaterno" class="form-register" placeholder="Apellido Materno" name="NuevoMaterno" required > 
        <input type="text" id="inputPuesto" class="form-register" placeholder="Puesto" name="NuevoPuesto" required>
        <input type="text" id="inputEmpresa" class="form-register" placeholder="Empresa" name="NuevoEmpresa" required>
        <input type="text" id="inputTelefono" class="form-register" placeholder="Teléfono" name="NuevoTelefono" required>
        <input type="text" id="inputCelular" class="form-register" placeholder="Celular" name="NuevoCelular" required>
        <input type="email" id="inputmail" class="form-register" placeholder="Correo" name="NuevoCorreo" required>
        <input type="date" id="inputCumpleanos" class="form-register" placeholder="Cumpleaños" name="NuevoCumpleanos" required>
        <button class="btn btn-lg btn-primary btn-block" id="btnRegister" type="submit" href="javascript:void(0)" onclick="toggle_visibility('popupContact');">Registrar Contacto</button>
        </form>
          </div>
      </div>
  </div>

    <div class="container">
      <!-- Static navbar -->
      <nav class="navbar navbar-default">
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Project name</a>
          </div>
          <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
              <li ><a href="#">Ventas</a></li>
              <li><a href="#">Productos</a></li>
              <li class="active"><a href="#">Contactos</a></li>
              <li><a href="#">Estadísticas</a></li>
              <li><a href="#">Objetivos</a></li>
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
                <ul class="dropdown-menu">
                  <li><a href="#">Action</a></li>
                  <li><a href="#">Another action</a></li>
                  <li><a href="#">Something else here</a></li>
                  <li role="separator" class="divider"></li>
                  <li class="dropdown-header">Nav header</li>
                  <li><a href="#">Separated link</a></li>
                  <li><a href="#">One more separated link</a></li>
                </ul>
              </li
            </ul>
            <ul class="nav navbar-nav navbar-right">
              <li><a href="./">Información <span class="sr-only">(current)</span></a></li>
              <li><a href="../navbar-static-top/">Configuración</a></li>
              <li><a href="../navbar-fixed-top/">Perfil</a></li>
            </ul>
          </div><!--/.nav-collapse -->
        </div><!--/.container-fluid -->
      </nav>

      <!-- Main component for a primary marketing message or call to action -->
      <div class="jumbotron">
        <h1>Contactos</h1>
        <button id="btnImport" type="submit">Importar Contactos</button>
        <button  id="btnAdd" type="submit" href="javascript:void(0)" onclick="toggle_visibility('popup-box1');">Añadir Contacto</button>
        <table border="5" cellspacing="4">
        <tr>
        <th align="center"><b>Nombre</b></th>
        <th align="center"><b>Apellido Paterno</b></th>
        <th align="center"><b>Apellido Materno</b></th>
        <th align="center"><b>Puesto</b></th>
        <th align="center"><b>Empresa</b></th>
        <th align="center" ><b>Teléfono</b></th>
        <th align="center" ><b>Celular</b></th>
        <th align="center"><b>Correo</b></th>
        <th align="center"><b>Cumpleaños</b></th>
        <th align="center"><b></b></th>
        <th align="center"><b></b></th>
        </tr>
        <?php while($row1 = mysqli_fetch_array($result1)):;?>
          <tr>
            <td><?php echo $row1[0];?></td>
            <td><?php echo $row1[1];?></td>
            <td><?php echo $row1[2];?></td>
            <td><?php echo $row1[3];?></td>
            <td><?php echo $row1[4];?></td>
            <td><?php echo $row1[5];?></td>
            <td><?php echo $row1[6];?></td>
            <td><?php echo $row1[7];?></td>
            <td><?php echo $row1[8];?></td>
            <td><a href='edit.php?edit=$row[0]'>Edit</a></td>
            <td>Delete</td>
          </tr>
        <?php endwhile;?>
        </table>
        <p>
          <a class="btn btn-lg btn-primary" href="../../components/#navbar" role="button">View navbar docs &raquo;</a>
        </p>
      </div>

    </div> <!-- /container -->


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="../../assets/js/vendor/jquery.min.js"><\/script>')</script>
    <script src="../../dist/js/bootstrap.min.js"></script>
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="../../assets/js/ie10-viewport-bug-workaround.js"></script>
  </body>
</html>
