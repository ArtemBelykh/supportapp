<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect to login page
// if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
//     header("location: /../login.php");
//     exit;
// }

require(dirname(__FILE__).'/../../config/config.php');

// **********
// get incoming parameters

// get doctors_id
$docID = '';
if( isset($_GET["docID"]) ) { $docID = mysqli_real_escape_string($link, $_GET['docID']); };

// get titleFull -- f1939
$titleFull = '';
if( isset($_GET["titleFull"]) ) { $titleFull = mysqli_real_escape_string($link, $_GET['titleFull']); };
// get titleShort -- f1940
$titleShort = '';
if( isset($_GET["titleShort"]) ) { $titleShort = mysqli_real_escape_string($link, $_GET['titleShort']); };

// get licNum -- f1941
$licNum = '0';
if( isset($_GET["licNum"]) ) { $licNum = mysqli_real_escape_string($link, $_GET['licNum']); };
// get licState -- f1945
$licState = '';
if( isset($_GET["licState"]) ) { $licState = mysqli_real_escape_string($link, $_GET['licState']); };
// get licStateWght -- f2205
$licStateWght = ''; 
if( isset($_GET["licStateWght"]) ) { $licStateWght = mysqli_real_escape_string($link, $_GET['licStateWght']); };

// get licStart -- f1942
$licStart = '';
if( isset($_GET["licStart"]) ) { $licStart = mysqli_real_escape_string($link, $_GET['licStart']); };
// get licExpry -- f2279
$licExpry = '';
if( isset($_GET["licExpry"]) ) { $licExpry = mysqli_real_escape_string($link, $_GET['licExpry']); };
// **********

// prepare sql request IN parameters
$sql = "call sp_insert_doctor_license_www_01('";

$sql.= $docID . "','";

$sql.= $titleFull . "','";
$sql.= $titleShort . "','";

$sql.= $licNum . "','";
$sql.= $licState . "','";
$sql.= $licStateWght . "','";

$sql.= $licStart . "','";
$sql.= $licExpry . "',";

$sql.= "@result);";

// print out the JSON result
echo $sql;

//free resources
mysqli_free_result($result);
mysqli_close($link);
?>
