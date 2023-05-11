<?php
// Initialize the session
session_start();
 
// // Check if the user is logged in, if not then redirect him to login page
// if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
//     header("location: /../login.php");
//    exit;
// }

//!!!!!!
require(dirname(__FILE__).'/../../config/config.php');
//!!!!!!

$arrVar = array(
  $_POST['contact_id'],
  $_POST['op_order']
);

// !!!!!
// $contact_id = 2240;
// !!!!!

$res = 1;
$sql = "CALL sp_disable_op_pet(";
// $sql.= implode("','", $arrVar);
foreach( $arrVar as $var ){
  if( $var == null ){
    $sql.= " null,";
  } else {
    $sql.= " '$var',";
  }
}
$sql = substr( $sql, 0, -1 ); // trim last comma
$sql.= ");";

// echo "<pre>"; echo $sql; echo "</pre>"; exit;

mysqli_query($link, $sql) or die('{"message":"error"}');
if (mysqli_affected_rows($link) <  0 ) {  
  $res = -1;
}

echo $res;
mysqli_close($link);
?>
