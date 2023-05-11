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

// if ( empty($_SESSION["docID"] )) { $_SESSION["docID"]=0; }
// $docID = $_SESSION["docID"];

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
	<script src="js/min-jquery.js"></script>
	<script src="https://cdn.jsdelivr.net/jquery.validation/1.16.0/jquery.validate.min.js"></script>
	<script src="https://cdn.jsdelivr.net/jquery.validation/1.16.0/additional-methods.min.js"></script>
	<script src="https://cdn.datatables.net/1.10.22/js/jquery.dataTables.min.js"></script>
	<script src="js/jquery.mask.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
	<link rel="stylesheet" href="js/nav/nav.css">
	<link rel="stylesheet" href="css/main.css" />
	<link href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" rel="stylesheet">
	<link rel="stylesheet" href="https://cdn.datatables.net/1.10.20/css/jquery.dataTables.min.css" />
	<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.1/moment-with-locales.min.js"></script>
</head>
<body>
	<div id="main-wrapper" class="container-fluid main-wrapper">
		<header class="header header--shadow">
			<a href="#" class="left-menu-logo"></a>
			<nav id="menu" class="menu left-menu sidenav sidenav-fixed ">
				</nav>
		</header>
		<main class="main">
			
			<!-- <div style="color: #fff; width: 400px; height: 100px; background-color: #512363;">ГНЕГНФЫЕВГНФЫПВОРФПЫВОРФПЫВОРФПЫОВПФОЫПВОФПВ</div>
			 -->
			<div id="dashboard-wrapper" class="container-fluid dashboard-wrapper">
				<section id="orders-section" class="tab-section orders-section">
					<div class="row">
						<div class="wrapper col-xs-12 col-sm-12 col-md-12">
						</div>
					</div>			
				</section>
			</div>
		</main>
	</div>
	
		<!-- -------------------  Left menu ----------------------->
		
  <script>
		const selectedId = <?php echo $selectedId; ?>;
    const userId = <?php echo $userId; ?>;
  </script>
  <script src="js/getPermissionsAndNotifications.js"></script>
  
</body>
</html>

