<?php
// Initialize the session
session_start();

//Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
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
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta http-equiv="X-UA-Compatible" content="ie=edge" />
	<title>Support</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
	<link
		href="https://fonts.googleapis.com/icon?family=Material+Icons"
		rel="stylesheet"
	/>
	<link rel="stylesheet" href="js/nav/nav.css">
	<!-- <link rel="stylesheet" href="css/materialize.min.css" /> -->
	<link rel="stylesheet" href="css/main.css" />
	<script src="js/min-jquery.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
	<!-- <link href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" rel="stylesheet"> -->

</head>
<body>
	<div id="main-wrapper" class="container-fluid main-wrapper">
		<header class="header header--shadow">
			<a href="#" class="left-menu-logo"></a>
			<nav id="menu" class="menu left-menu sidenav sidenav-fixed ">
				</nav>
		</header>
		<main class="main">
			<div id="dashboard-wrapper" class="container-fluid dashboard-wrapper">
				<section id="pets-section" class="tab-section pets-section">
					
				</section>
			</div>
		</main>
	</div>
	
  <script>
		const selectedId = <?php echo $selectedId; ?>;
    const userId = <?php echo $userId; ?>;
  </script>
  <script src="js/getPermissionsAndNotifications.js"></script>
  
</body>
</html>

