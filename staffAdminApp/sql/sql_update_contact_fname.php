<?php
// Initialize the session
session_start();
 
// // Check if the user is logged in, if not then redirect him to login page
// if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
//     header("location: /../login.php");
//    exit;
// }

require(dirname(__FILE__).'/../../config/config.php');
$id = ( isset($_GET["id"]) )? mysqli_real_escape_string($link, $_GET['id']) : 2240 ;

$id = $_POST['id'];
$bday  = $_POST['bday'];

// !!!!!
// $id = 2240;
// !!!!!

$res = 1;
// $sql = "CALL sp_update_contact_fname( '{$id}', '{$fname}' );"; 
// mysqli_query($link, $sql) or die('{"message":"error"}');
// if (mysqli_affected_rows($link) <  0 ) {  
//   $res = -1;
// }

echo $res;
mysqli_close($link);
?>
