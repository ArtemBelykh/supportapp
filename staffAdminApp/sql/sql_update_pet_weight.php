<?php
// Initialize the session
session_start();
 
// // Check if the user is logged in, if not then redirect him to login page
// if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
//     header("location: /../login.php");
//    exit;
// }

require(dirname(__FILE__).'/../../config/config.php');

$pet_id = $_POST['pet_id'];
$weight = $_POST['weight'];

//$sql = "SELECT * FROM v_op_contacts_01 where contact_id=".$id;

$res = 1;
// $sql = "CALL sp_update_pet_weight( '{$pet_id}', '{$weight}' );"; 
// mysqli_query($link, $sql) or die('{"message":"error"}');
// if (mysqli_affected_rows($link) <  0 ) {  
//   $res = -1;
// }

echo $res;
mysqli_close($link);
?>
