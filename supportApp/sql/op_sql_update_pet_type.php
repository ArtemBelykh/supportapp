<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
  //header("location: /../login.php");
  die('{"message":"error"}');
  exit;
}

// echo "<pre>"; print_r( $_POST ); echo "</pre>"; exit;

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

// // retrieve POST 
$data = json_decode( file_get_contents('php://input') );
// var_dump( $data ); exit;
$pet_id   = $data->id ; //  = $_POST['subject'];
$type     = $data->type; //  = $_POST['note_body'];
$op_order = $data->op_order;

// $pet_id   = $_POST['pet_id'];
// $type     = $_POST['type'];
// $op_order = $_POST['op_order'];

$sql = "CALL sp_update_pet_type( '{$pet_id}', '{$type}' );"; 
// echo $sql; mysqli_close($link); exit; 
mysqli_query($link, $sql) or die('{"message":"error0"}');

// if ( mysqli_affected_rows($link) <  0 ) {  
//   //$res = -1;
//   mysqli_close($link);
//   die('{"message":"error1"}');
// } else  {
//   $res = 1;
// }

// update OP weight
//$op_field = ( $op_order == 0 )? "f1515" : "f1540";
if ( $op_order == 0 ){
  $op_field = 'f1515';
  $op_type = ( $type == 1 )? 31: 30 ;
} else {
  $op_field = 'f1540';
  $op_type = ( $type == 1 )? 154: 153 ;
}

$arrVar = array( 
  "id"          => $contact_id, // 0 - id  
  $op_field     => $op_type
);

// echo "<pre>"; print_r( $arrVar ); echo "</pre>"; mysqli_close($link); exit;

$response = $clientOP->contact()->update($arrVar);

$myObj = new stdClass();
$myObj->result = 1;

$myJSON = json_encode($myObj);

echo $myJSON;

mysqli_close($link);
?>
