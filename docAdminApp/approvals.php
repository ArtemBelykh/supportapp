<?php
// Initialize the session
session_start();

//Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true) {
    header("location: login.php");
    exit;
};

require(dirname(__FILE__).'/../config/config.php');

$userId = $_SESSION["id"];
$selectedId  = $_SESSION["selectedId"];

header('Expires: Tue, 01 Jan 2000 00:00:00 GMT');
header('Last-Modified: ' . gmdate("D, d M Y H:i:s") . ' GMT');
header('Cache-Control: no-store, no-cache, must-revalidate');
header('Cache-Control: post-check=0, pre-check=0', false);
header('Pragma: no-cache'); 

?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>

  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://cdn.datatables.net/1.10.20/css/jquery.dataTables.min.css" />

	<script src="https://cdn.jsdelivr.net/npm/json2csv"></script>
	<script     src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.3/jspdf.debug.js"></script>

  <link rel="shortcut icon" href="./img/favicon.png">
  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
  
  <link rel="stylesheet" href="js/nav/nav.css">
  
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
  <link rel="stylesheet" type="text/css" href="./css/main.css">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">  

  <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
  
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
  <script src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.1/moment-with-locales.min.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
</head>
<body>
  <div id="main-wrapper" class="container-fluid main-wrapper">
    <header class="header header--shadow">
      <a href="#" class="left-menu-logo"></a>
      <nav id="menu" class="menu left-menu sidenav sidenav-fixed "></nav>
    </header>
    <main class="main">
      <div id="dashboard-wrapper" class="container-fluid dashboard-wrapper">
        <section id="approvals-section" class="tab-section approvals-section">
          <div class="row">
						<div class="wrapper col-xs-12 col-sm-6 col-md-12">
						</div>
					</div>
        </section>
      </div>

    </main>
  </div>
  
  <!-- <script src="js/materialize.min.js"></script> -->
  <script>
    const selectedId = <?php echo $selectedId; ?>;
    const userId = <?php echo $userId; ?>; 
  </script>
  <script src="js/getPermissionsAndNotifications.js"></script>
</body>
</html>