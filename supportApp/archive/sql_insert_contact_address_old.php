<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect him to login page
if( !isset( $_SESSION["loggedin"] ) || $_SESSION["loggedin"] !== true ){
    header("location: /../login.php");
   exit;
}

// get customer id
$contact_id =  $_SESSION["selectedId"] ;
// $id = ( isset($_GET["id"]) )? mysqli_real_escape_string($link, $_GET['id']) : $_SESSION["selectedId"] ;
//echo "<pre>"; echo $contact_id ; echo "</pre>";

// *** ***
// require(dirname(__FILE__).'/../../config/config_op.php');
// require(dirname(__FILE__).'/../../config/config.php');
// *** ***

$arrVar = array(
  // $_POST['id'],
  $contact_id,
  $_POST['address1'],
  $_POST['address2'],
  $_POST['city'],
  $_POST['zip'],
  $_POST['state_code']
);

// !!!!!
// echo "<pre>"; print_r( $arrVar ); echo "</pre>"; exit;
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

//echo "<pre>"; echo $sql; echo "</pre>"; // exit;

mysqli_query($link, $sql) or die('{"message":"error"}');
if (mysqli_affected_rows($link) <  0 ) {  
  $res = -1;
}

//echo 'res -> '.$res;
echo $res;
mysqli_close($link);
?>
