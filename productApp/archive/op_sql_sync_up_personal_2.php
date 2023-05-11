<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect him to login page
// if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
//     header("location: login.php");
//     exit;
// }

// get contact_id
if( isset($_SESSION["selectedId"]) ){
   $contact_id = $_SESSION["sessionId"];
} else {
   $contact_id = 2240; 
   // die("{message:error}")
} 

if ( $contact_id == 0 ) { 
  $contact_id = 2240; 
  // die('{"message":"error"}');
}

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
function httpPost( $relative, $data )
{
  global $urlPath;  
  $url = $urlPath.$relative;

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

// *** ***
require(dirname(__FILE__).'/../../config/config_op.php');
require(dirname(__FILE__).'/../../config/config.php');
// *** ***

// Retrieve Contact ID by ID
$requestParams = array(
  "objectID" => 0, // Object type ID: 0
  "id"       => $contact_id  
);

$response = $clientOP->object()->retrieveSingle( $requestParams );
$arrRes = json_decode( $response, true );

echo "<pre>";
echo print_r ($arrRes);
echo "</pre>";
exit;

//echo "<pre>"; echo $arrRes["data"]["firstname"]; echo "</pre>";

// *******
// Update Contact
// *******

// prepare params
$firstname  = prepareMySQL( $arrRes["data"]["firstname"], 100) ;
$lastname   = prepareMySQL( $arrRes["data"]["lastname"], 100 );
$birthday   = ( is_nan( intVal( $arrRes["data"]["birthday"] ))) ? null: $arrRes["data"]["birthday"];//prepareMySQL( objContact.birthday, 45 );
$email      = prepareMySQL( $arrRes["data"]["email"], 128 );
$parent_id  = ( is_nan( intVal( $arrRes["data"]["f2438"] ))) ? null: $arrRes["data"]["f2438"];
$gender     = ( $arrRes["data"]["f1505"] == '21' )? 1: 0; // f1505 - 21 M, 22 F;
$is_over_18 = ( $arrRes["data"]["f1547"] == '164' )? 1: 0; // f1547 - 164 Y, 165 N;
$phone      = prepareMySQL( $arrRes["data"]["sms_number"], 16 );    

// check if somehting is there
// if ( $firstname === null && $lastname === null && $email === null ){
//   die( $succeeded );
// }

// assemble the query array
$arrVar0 = array( 
  "id"        => $arrRes["data"]["id"],  // 0 - id
  "firstname" => $firstname,             // 1 - firstname
  "lastname"  => $lastname,              // 2 - lastname
  "birthday"  => $birthday,              // 3 - birthday
  "email"     => $email,                 // 4 - email
  "parent_id" => $parent_id,             // 5 - parent id
  "gender"    => $gender,                // 6 - gender
  "is_over_18"=> $is_over_18,            // 7 - is_over_id
  "phone"     => $phone,                 // 8 - phone
  "unixdate"  => $arrRes["data"]["date"] // 9 - unixdate
);

// send 
// echo "<pre>"; echo "posting arrVar0 with.."; echo "</pre>";
// // echo "<pre>"; print_r( $arrVar0 ); echo "</pre>";
$res0 = httpPost( 'sql_insert_contact.php', $arrVar0 );
// echo "<pre>"; echo $res0; echo "</pre>";
if( $res0 != '1') { die('{"message":"error"}'); }

// *******
// Update Contact Address
// *******
// check if somehting is there

// prepare params
$address1 = prepareMySQL( $arrRes["data"]["address"], 85 );
$address2 = prepareMySQL( $arrRes["data"]["address2"], 85 );
$city     = prepareMySQL( $arrRes["data"]["city"], 85 );

$zip_str  = substr( $arrRes["data"]["zip"], 0, 5 );
$zip      = ( is_nan( intVal( $zip_str )) )? null: intVal( $zip_str ) ;  

$state    = prepareMySQL( $arrRes["data"]["state"], 2 );

// assemble the query array
$arrVar1 = array( 
  "id"          => $arrRes["data"]["id"], // 0 - id
  "address1"    => $address1,             // 1 - address1
  "address2"    => $address2,             // 2 - address2
  "city"        => $city,                 // 3 - city
  "zip"         => $zip,                  // 4 - zip
  "state_code"  => $state                 // 5 - state  
);

// send 
// echo "<pre>"; echo "posting arrVar1 with.."; echo "</pre>";
// //echo "<pre>"; print_r( $arrVar1 ); echo "</pre>";
$res1 = httpPost( 'sql_insert_contact_address.php', $arrVar1 );
// echo "<pre>"; echo $res1; echo "</pre>";
if( $res1 != '1') { die('{"message":"error"}'); }


// *******
// Update Contact Pets
// ******* 

// *****
// Pet #0 (1st)
// *****

//'f1515, f1516, f1517, f1518, ';  // Pet #0 type, Name , Breed, Weight      
if ( $arrRes["data"]["f1516"] == '' || $arrRes["data"]["f1517"] == '' ){     

  // assemble the query array
  $arrVar20 = array( 
    "contact_id" => $arrRes["data"]["id"],
    "op_order"   => 0    
  );

  // send 
  // echo "<pre>"; echo "posting arrVar20 with.."; echo "</pre>";
  // echo "<pre>"; print_r( $arrVar20 ); echo "</pre>";
  $res20 = httpPost( 'sql_disable_pet.php', $arrVar20 );
  // echo "<pre>"; echo $res20; echo "</pre>";
  if( $res20 != '1') { die('{"message":"error"}'); }

} else {

  // Pet #0
  $type  = ( $arrRes["data"]["f1515"] == '31' )? 1: 2; // f1547 - 30 Cat, 31 Dog; // fixed since conId>720000
  $title = prepareMySQL( $arrRes["data"]["f1516"], 45 );
  $breed = prepareMySQL( $arrRes["data"]["f1517"], 45 );
  $weight = ( is_nan( $arrRes["data"]["f1518"] ))? 0 : round( substr( $arrRes["data"]["f1518"], 0, 4 ), 2 );            

  // assemble the query array  
  $arrVar21 = array( 
    "contact_id" => $arrRes["data"]["id"],
    "type"       => $type,
    "title"      => $title,
    "breed"      => $breed,
    "weight"     => $weight,
    "op_order"   => 0
  );

  // send 
  // echo "<pre>"; echo "posting arrVar21 with.."; echo "</pre>";
  // echo "<pre>"; print_r( $arrVar21 ); echo "</pre>";
  $res21 = httpPost( 'sql_insert_pet.php', $arrVar21 );
  //echo "<pre>"; echo $res21; echo "</pre>";
  if( $res21 != '1') { die('{"message":"error"}'); }
}

// *****
// Pet #1 (2nd)
// *****

//'f1540, f1541, f1542, f1665';  // Pet #1 type, Name , Breed, Weight
if ( $arrRes["data"]["f1541"] == '' || $arrRes["data"]["f1542"] == '' ){     

  // assemble the query array
  $arrVar30 = array( 
    "contact_id" => $arrRes["data"]["id"],
    "op_order"   => 1 
  );

  // send 
  // echo "<pre>"; echo "posting arrVar30 with.."; echo "</pre>";
  // echo "<pre>"; print_r( $arrVar30 ); echo "</pre>";
  $res30 = httpPost( 'sql_disable_pet.php', $arrVar30 );
  // echo "<pre>"; echo $res30; echo "</pre>";
  if( $res30 != '1') { die('{"message":"error"}'); }

} else {

  // Pet #1
  $type  = ( $arrRes["data"]["f1540"] == '154' )? 1: 2; // f1540 - 153 Cat, 154 Dog;
  $title = prepareMySQL( $arrRes["data"]["f1541"], 45 );
  $breed = prepareMySQL( $arrRes["data"]["f1542"], 45 );
  $weight = ( is_nan( $arrRes["data"]["f1665"] ))? 0 : round( substr( $arrRes["data"]["f1665"], 0, 4 ), 2 );       
  
  // assemble the query array
  // assemble the query array  
  $arrVar31 = array( 
    "contact_id" => $arrRes["data"]["id"],
    "type"       => $type,
    "title"      => $title,
    "breed"      => $breed,
    "weight"     => $weight,
    "op_order"   => 1
  );

  // send 
  // echo "<pre>"; echo "posting arrVar31 with.."; echo "</pre>";
  // // echo "<pre>"; print_r( $arrVar31 ); echo "</pre>";
  $res31 = httpPost( 'sql_insert_pet.php', $arrVar31 );
  // echo "<pre>"; echo $res31; echo "</pre>";
  if( $res31 != '1') { die('{"message":"error"}'); }

}



echo $succeeded;

//free resources
mysqli_free_result($result);
mysqli_close($link);
?>