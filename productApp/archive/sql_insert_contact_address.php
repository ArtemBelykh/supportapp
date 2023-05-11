<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect him to login page
// if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
//     header("location: /../login.php");
//    exit;
// }

require(dirname(__FILE__).'/../../config/config.php');

// get customer id
$contact_id = $_SESSION["selectedId"];
// echo "<pre>"; print_r( $_SESSION ); echo "</pre>"; 
// $contact_id = ( isset( $_SESSION["selectedId"] ))? mysqli_real_escape_string($link, $_SESSION["selectedId"] ) : $_POST['id'] ;

$arrVar = array(
  //$_POST['id'],
  $contact_id,
  $_POST['address1'],
  $_POST['address2'],
  $_POST['city'],
  $_POST['zip'],
  $_POST['state_code']
);

// !!!!!
// $id = 2240;
// !!!!!

$res = 1;
$sql = "CALL sp_insert_address_01(";
foreach( $arrVar as $var ){
  if( $var == null ){
    $sql.= " null,";
  } else {
    $sql.= " '$var',";
  }
}
$sql = substr( $sql, 0, -1 ); // trim last comma
$sql.= ", @res);";

// echo "<pre>"; echo $sql; echo "</pre>"; exit;

mysqli_query($link, $sql) or die('{"message":"error"}');
if (mysqli_affected_rows($link) <  0 ) {  
  $res = -1;
}

echo $res;
mysqli_close($link);
?>
