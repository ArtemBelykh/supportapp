<?php
// Initialize the session
session_start();

//Check if the user is logged in, if not then redirect him to login page
//if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
//    header("location: login.php");
//    exit;
//};

require(dirname(__FILE__).'/../config/config.php');

$userId = $_SESSION["id"];
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
	<title>Support</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">

	<script src="js/min-jquery.js"></script>
	<script src="https://cdn.jsdelivr.net/jquery.validation/1.16.0/jquery.validate.min.js"></script>
	<script src="https://cdn.jsdelivr.net/jquery.validation/1.16.0/additional-methods.min.js"></script>
	<script src="js/jquery.mask.min.js"></script>
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
	<script src="https://code.jquery.com/color/jquery.color-2.2.0.min.js"
		integrity="sha256-aSe2ZC5QeunlL/w/7PsVKmV+fa0eDbmybn/ptsKHR6I="
		crossorigin="anonymous">
	</script>
	
	<link rel="stylesheet" href="js/nav/nav.css">
	<link rel="stylesheet" href="css/main.css" />
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
				<section id="contactInfo-section" class="tab-section contactInfo-section">
					<div class="row">
						<div class="wrapper col-xs-12 col-sm-12 col-md-12">
						</div>
					</div>
				</section>
			</div>
		</main>
	</div>

  <script>
		const selectedId = <?php echo $selectedId; ?>;
		const userId = <?php echo $userId; ?>;
	</script>
	<!-- <script src="js/menu.js"></script> -->
  <script src="js/getPermissionsAndNotifications.js"></script>
</body>
</html>

