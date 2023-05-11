<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect him to login page
if( !isset( $_SESSION["loggedin"] ) || $_SESSION["loggedin"] !== true ){
  //  header("location: /../login.php");
  die('{"message":"error"}');
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

// *** ***
function sqlRunProcRes( $nameProc, $arrVar ){

  global $link;

  $res = 1;
  $sql = "CALL ".$nameProc."(";
  // $sql.= implode("','", $arrVar);
  foreach( $arrVar as $var ){
    if( $var == null ){
      $sql.= " null,";
    } else {
      $sql.= " '$var',";
    }
  }
  $sql = substr( $sql, 0, -1 ); // trim last comma
  $sql.= ", @res);";

  // echo "<pre>"; echo $sql; echo "</pre>"; return; // exit;

  mysqli_query( $link, $sql ) or die("<b>Error:</b><br/>" . mysqli_error($link));// die('{"message":"errorSQL0"}');// die("<b>Error:</b><br/>" . mysqli_error($link));// 
  if (mysqli_affected_rows($link) <  0 ) {  
    $res = -1;
  }
  return $res;  
}
// *** ***

// prepare params
$address1 = prepareMySQL( $_POST['address1'], 85 );
$address2 = prepareMySQL( $_POST['address2'], 85 );
$city     = prepareMySQL( $_POST['city'], 85 );

$zip_str  = substr( $_POST['zip'], 0, 5 );
$zip      = ( is_nan( intVal( $zip_str )) )? null: intVal( $zip_str ) ;  

$state    = prepareMySQL( $_POST['state_code'], 2 );

// assemble the query array
$arrVar = array( 
  "id"          => $contact_id, // 0 - id
  //"address1"    => $address1,   // 1 - address1
  "address"     => $address1,   // 1 - address1
  "address2"    => $address2,   // 2 - address2
  "city"        => $city,       // 3 - city
  "zip"         => $zip,        // 4 - zip
  // "state_code"  => $state       // 5 - state  
  "state"       => $state       // 5 - state  
);

$res = sqlRunProcRes( 'sp_insert_address_01', $arrVar );
if( $res !== 1) { die('{"message":"error"}'); }

/*
$arrVar = array(
  // $_POST['id'],
  $contact_id,
  $_POST['address1'],
  $_POST['address2'],
  $_POST['city'],
  $_POST['zip'],
  $_POST['state_code']
);
*/

// ***************
// Update OP
// ***************
//if( $res != -1){
  /*
  $requestParams = array(
    // "objectID" => 0, // Object type ID: 0
    "id"       => $arrVar['id'],  //contact_id
    "address"  => $arrVar['address1'],  // address1
    "address2" => $arrVar['address2'],  // address2
    "city"     => $arrVar['city'],  // city
    "zip"      => $arrVar['zip'],  // zip
    "state"    => $arrVar['state_code'],  // state_code
  );
*/
  $response = $clientOP->contact()->update($arrVar);
  // echo ($response["data"]["attrs"]["id"]);
  //$arrRes = json_decode( $response, true );
  // echo "<pre>";
  // echo print_r ($response);
  // echo "<br>";
  
// }
// ***************

//echo 'res -> '.$res;
// $myObj = new stdClass();
// $myObj->result = $res;
// $succeeded = json_encode($myObj);

// echo $succeeded;
echo $res;
mysqli_close($link);
?>
