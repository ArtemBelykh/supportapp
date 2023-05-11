<?php
// Initialize the session
session_start();

//Check if the user is logged in, if not then redirect him to login page
//if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
//    header("location: login.php");
//    exit;
//};

$userId = $_SESSION["id"];
if ( !isset($_SESSION["selectedId"]) ) { $_SESSION["selectedId"]=0; }
$selectedId = $_SESSION["selectedId"];

header('Expires: Tue, 01 Jan 2000 00:00:00 GMT');
header('Last-Modified: ' . gmdate("D, d M Y H:i:s") . ' GMT');
header('Cache-Control: no-store, no-cache, must-revalidate');
header('Cache-Control: post-check=0, pre-check=0', false);
header('Pragma: no-cache');

?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Support Pets</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />
    <link href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" rel="stylesheet">
    <link rel="stylesheet" href="js/nav/nav.css">
	<link rel="stylesheet" href="css/main.css">
	<link rel="stylesheet" href="css/styles.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  </head>

  <body>
    <div class="container-fluid main-wrapper">

          <header class="header header--shadow">
    				<a href="#" class="left-menu-logo"></a>
    				<div id="menu" class="menu left-menu sidenav sidenav-fixed ">

    				</div>
    			</header>
      <main class="main">
          <div id="dashboard-wrapper" class="container-fluid dashboard-wrapper">
            <section id="store-container" class="tab-section store-container">
          	    <div class="row">

                </div>
          	</section>
      </main>


      <style>
        .menu.active {
            margin-top: 10px;
            min-width: 0px !important;
        }
              </style>
    </div>
  <script>
    const selectedId = <?php echo $selectedId; ?>;
    const userId = <?php echo $userId; ?>;
  </script>
  <script src="js/getPermissionsAndNotifications.js"></script>
  	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>

  </body>
</html>
