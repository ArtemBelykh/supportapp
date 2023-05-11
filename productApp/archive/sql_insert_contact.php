<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: /../login.php");
   exit;
}

//!!!!!!
require(dirname(__FILE__).'/../../config/config.php');
//!!!!!!

$arrVar = array(
  $_POST['id'],
  $_POST['firstname'],
  $_POST['lastname'],
  $_POST['birthday'],
  $_POST['email'],
  $_POST['parent_id'],
  $_POST['gender'],
  $_POST['is_over_18'],
  $_POST['phone'],
  $_POST['unixdate']
);

// !!!!!
// $id = 2240;
// !!!!!

$res = 1;
$sql = "CALL sp_insert_ontraport_contact_01(";
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

// echo "<pre>"; echo $sql; echo "</pre>"; // exit;

mysqli_query( $link, $sql ) or die('{"message":"error"}');// die("<b>Error:</b><br/>" . mysqli_error($link));// 
if (mysqli_affected_rows($link) <  0 ) {  
  $res = -1;
}

echo $res;

//free resources
//mysqli_free_result($result);
mysqli_close($link);
?>
