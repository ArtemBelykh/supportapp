<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
  //header("location: /../login.php");
  die('{"message":"error"}');
  exit;
}

// get contact_id
if( isset($_SESSION["selectedId"]) ){
  $contact_id = $_SESSION["selectedId"];
} else {
 // $contact_id = 2240; 
 die('{"message":"error"}');
} 

if ( $contact_id == 0 ) { 
 // $contact_id = 2240; 
 die('{"message":"error"}');
}

// *** ***
require(dirname(__FILE__).'/../../config/config_op.php');
require(dirname(__FILE__).'/../../config/config.php');
// *** ***

// *** ***
function prepareMySQL( $string, $slice = 100 ){  
  if ( $string === "" || $string === null ) { return null; }    
  preg_replace('/(<([^>]+)>)/', '', $string);      // remove html tags            
  preg_replace('/[\u0800-\uFFFF]/', '', $string);  // remove weird chars
  $string = substr( $string, 0, $slice );
  return $string; 
};
// *** ***

$pet_id   = $_POST['pet_id'];
$title    = prepareMySQL( $_POST['title'], 45);
$op_order = $_POST['op_order'];

$sql = "CALL sp_update_pet_title( '{$pet_id}', '{$title}' );"; 
mysqli_query($link, $sql) or die('{"message":"error"}');

if (mysqli_affected_rows($link) <  0 ) {  
  //$res = -1;
  mysqli_close($link);
  die('{"message":"error"}');
} else  {
  $res = 1;
}

// update OP name
$op_field = ( $op_order == 0 )? "f1516" : "f1541";

$arrVar = array( 
  "id"          => $contact_id, // 0 - id  
  $op_field     => $title
);

$response = $clientOP->contact()->update($arrVar);

//echo $res;
$myObj = new stdClass();
$myObj->result = $res;

$myJSON = json_encode($myObj);

echo $myJSON;
mysqli_close($link);

?>
