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
$docID  = $_SESSION["docID"];

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
	<link
		href="https://fonts.googleapis.com/icon?family=Material+Icons"
		rel="stylesheet"
	/>
	<link rel="stylesheet" href="js/nav/nav.css">
	<link rel="stylesheet" href="css/materialize.min.css" />
	<link rel="stylesheet" href="css/main.css" />
	
	<!-- <link rel="stylesheet" href="js/nav/nav.css">
	<link rel="stylesheet" href="https://cdn.datatables.net/1.10.20/css/jquery.dataTables.min.css" />
	<link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
	<link rel="stylesheet" href="css/materialize.min.css" />
	<link rel="stylesheet" href="css/main.css" /> -->
</head>
<body>
	<div id="main-wrapper" class="container-fluid main-wrapper pushContent">
		<header>
			<nav id="menu" class="menu left-menu sidenav sidenav-fixed ">
				</nav>
		</header>
		<main class="main">
			
			<!-- <div style="color: #fff; width: 400px; height: 100px; background-color: #512363;">ГНЕГНФЫЕВГНФЫПВОРФПЫВОРФПЫВОРФПЫОВПФОЫПВОФПВ</div>
			 -->
			<div id="dashboard-wrapper" class="container-fluid dashboard-wrapper">
				<section id="support-section" class="tab-section support-section">
					<div class="row header-block header-block--wider">
						<div class="header-block__container">
							<h3 class="header-block__title">Message2</h3>
						</div>
					</div>
					<div class="row">
						<div class="col s12">
						</div>
					</div>
					
				</section>
			</div>
		</main>
	</div>
	
		<!-- -------------------  Left menu ----------------------->
		
		


	<script src="js/min-jquery.js"></script>
	<script src="js/materialize.min.js"></script>
	<!-- <script src="js/main.js"></script> -->
	<script src="https://cdn.jsdelivr.net/jquery.validation/1.16.0/jquery.validate.min.js"></script>
	<script src="https://cdn.jsdelivr.net/jquery.validation/1.16.0/additional-methods.min.js"></script>
	<script src="https://cdn.datatables.net/1.10.22/js/jquery.dataTables.min.js"></script>
	<script src="js/jquery.mask.min.js"></script>
  <script src="js/nav/nav.js"></script>
  
  <script>
    const userId = <?php echo $userId; ?>;
  </script>

</body>
</html>

