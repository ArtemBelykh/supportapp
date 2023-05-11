<?php
// var_dump($_GET);
// exit;
// Initialize the session
session_start();

// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
};

require(dirname(__FILE__).'/../config/config.php');

// get docID -- f1858
//$docID = 0;

$userId = $_SESSION["id"];

// $_SESSION["docID"] !empty()
// if( isset( $_GET["docID"] )  && !empty( $_GET["docID"] )  && is_numeric( $_GET['docID'] )) { 
if( isset( $_GET["docID"] ) && !empty( $_GET["docID"] ) ) { 
  $docID = mysqli_real_escape_string($link, $_GET['docID']);
  $_SESSION["docID"] = $docID;  
} elseif ( !isset( $_SESSION["docID"] ) || $_SESSION["docID"] == 0 ) {
  header("location: employees-list.php");
  exit;
} else {
  $docID = $_SESSION["docID"];
};

header("Expires: Tue, 01 Jan 2000 00:00:00 GMT");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
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

	<link rel="stylesheet" href="https://cdn.datatables.net/1.10.20/css/jquery.dataTables.min.css" />

  <link rel="shortcut icon" href="./assets/img/favicon.png">
  <link rel="stylesheet" type="text/css" href="./assets/css/styles.css">
  <link rel="stylesheet" type="text/css" href="./css/style.css">
  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">

  <link rel="stylesheet" href="js/nav/nav.css">

  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">  

  <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
  <script src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.1/moment-with-locales.min.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
</head>
<body>

	<div class="wrapper">
    <header class="header header--shadow">
      <a href="#" class="left-menu-logo"></a>
      <div id="menu" class="menu left-menu sidenav sidenav-fixed "></div>
    </header>
		<div class="container" id="container">          
    	<main class="main">
         
			</main>
		</div>
  </div>
  
  <!-- <script src="js/materialize.min.js"></script> -->
  <script>
    let currDoctorId = <?php echo $docID; ?>;
    console.log('currDoctorId', currDoctorId);     

    const userId = <?php echo $userId; ?>;
  </script>
  <script src="js/getPermissions.js"></script>
  <!-- <script src="js/nav/nav.js"></script> -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js"></script>
</body>
</html>