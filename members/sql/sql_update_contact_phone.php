<?php
// Initialize the session
session_start();
 
// // Check if the user is logged in, if not then redirect him to login page
// if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
//     header("location: /../login.php");
//    exit;
// }

require(dirname(__FILE__).'/../../config/config.php');

$id = $_POST['id'];
$phone  = $_POST['phone'];

// !!!!!
$id = 2240;
// !!!!!

$sql = "CALL sp_insert_update_contact_phone( '{$id}', '{$phone}', @result );"; 
$res = 1;
mysqli_query($link, $sql);// or die("<b>Error:</b> Problem on Image Insert<br/>" . mysqli_error($link));
if (mysqli_affected_rows($link) <  0 ) {  
  $res = -1;
}

echo $res;
mysqli_close($link);
?>
