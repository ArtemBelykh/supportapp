<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect him to login page
// if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
//     header("location: login.php");
//     exit;
// }

// // get contact_id
// if( isset($_SESSION["selectedId"]) ){
//    $contact_id = $_SESSION["sessionId"];
// } else {
//    $contact_id = 2240; 
//    // die("{message:error}")
// } 

// if ( $contact_id == 0 ) { 
//   $contact_id = 2240; 
//   // die('{"message":"error"}');
// }

// set up vars
$domain = $_SERVER['HTTP_HOST'];
$prefix = $_SERVER['HTTPS'] ? 'https://' : 'http://';
$urlPath = $prefix.$domain.'/supportApp/sql/';

$myObj = new stdClass();
$myObj->result = 1;
$succeeded = json_encode($myObj);
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

// *** ***
function httpPost( $relative, $data ){
  global $urlPath;  
  $url = $urlPath.$relative;

  echo "<pre>"; echo '$url -> '.$url ;echo "</pre>"; 

  $curl = curl_init( $url );
  curl_setopt( $curl, CURLOPT_POST, true );
  curl_setopt( $curl, CURLOPT_POSTFIELDS, http_build_query($data));
  // curl_setopt( $curl, CURLOPT_POSTFIELDS, $data );
  curl_setopt( $curl, CURLOPT_RETURNTRANSFER, true );
  $response = curl_exec( $curl );
  curl_close( $curl );
  return $response;
}
// *** ***

// // *** ***
// require(dirname(__FILE__).'/../../config/config_op.php');
// require(dirname(__FILE__).'/../../config/config.php');
// // *** ***

// assemble the query array
$arrVar1 = array( 
  // "id"          => $arrRes["data"]["id"],
  "pet_id"      => 2368, // $contact_id ,
  "type"        => 1,
  "op_order"    => 0
  //"address1"    => $address1,     

);

// send 
echo "<pre>"; echo "posting arrVar1 with.."; echo "</pre>";
echo "<pre>"; print_r( $arrVar1 ); echo "</pre>";

// echo "<pre>"; print_r( $_SESSION ); echo "</pre>";

$res1 = httpPost( 'op_sql_update_pet_type.php', $arrVar1 );
echo "<pre>"; echo '$res1 -> '.$res1; echo "</pre>"; 
//exit;

//if( $res1 != '1') { die('{"message":"error"}'); }

// echo $succeeded;

//free resources
// mysqli_free_result($result);
// mysqli_close($link);
?>