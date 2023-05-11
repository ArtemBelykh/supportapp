<?php
// Initialize the session
session_start();

//Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
};

require(dirname(__FILE__).'/../config/config.php');

$name = ( isset($_GET["name"]) )? mysqli_real_escape_string($link, $_GET['name']) : 0;

echo $_SESSION[ $name ];

// if ( !isset($_SESSION["docID"]) || $_SESSION["docID"] !== 0  ) { $_SESSION["docID"]=0; }

// if ( empty($_SESSION["docID"] )) { $_SESSION["docID"]=0; }
// $docID = $_SESSION["docID"];

header("Expires: Tue, 01 Jan 2000 00:00:00 GMT");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header('Cache-Control: no-store, no-cache, must-revalidate');
header('Cache-Control: post-check=0, pre-check=0', false);
header('Pragma: no-cache'); 

?>