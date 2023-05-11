<?php
// Initialize the session
session_start();

//Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
};

$userId = $_SESSION["id"];
if ( !isset($_SESSION["selectedItemId"]) ) { $_SESSION["selectedItemId"]=0; }
$selectedItemId = $_SESSION["selectedItemId"];

if ( !isset($_SESSION["selectedProductId"]) ) { $_SESSION["selectedProductId"]=0; }
$selectedProductId = $_SESSION["selectedProductId"];

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
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.datatables.net/1.10.20/css/jquery.dataTables.min.css" />
  <link rel="stylesheet" href="css/main.css">
  <link rel="stylesheet" href="js/nav/nav.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script src="https://cdn.datatables.net/1.10.22/js/jquery.dataTables.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
  <title>Document</title>
</head>
<body>
  <div class="container">
    <header class="header header--shadow">
    			<a href="#" class="left-menu-logo"></a>
    			<nav id="menu" class="menu left-menu sidenav sidenav-fixed ">
    				</nav>
    		</header>
    <main class="main">
      <section class="search-item-section">

      </section>
    </main>

    <script>
      const selectedItemId = <?php echo $selectedItemId; ?>;
      const selectedProductId = <?php echo $selectedProductId; ?>;
    </script>
    <script src="js/setMenu.js"></script>
</body>
</html>