<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
  //header("location: /../login.php");
  die('{"message":"error0"}');  
}

// get contact_id
if( isset($_SESSION["selectedId"]) ){
  $contact_id = $_SESSION["selectedId"];
} else {
 // $contact_id = 2240; 
 die('{"message":"error1"}');
} 

if ( $contact_id == 0 ) { 
 $contact_id = 2240; 
 die('{"message":"error2"}');
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
$data = json_decode( file_get_contents('php://input') );

$pet_type_id  = $data->pet_type_id; 
$title        = $data->title;       
$breed        = prepareMySQL( $data->breed, 45);
$weight       = prepareMySQL( $data->weight, 45);
$op_order     = $data->op_order;   

/*
$pet_type_id  = $_POST['pet_type_id'];  // $data->pet_type_id; 
$title        = $_POST['title'];        ///$data->title;       
$breed        = prepareMySQL( $_POST['breed'], 85);  // prepareMySQL( $data->breed, 45);
$weight       = prepareMySQL( $_POST['weight'], 85);  // prepareMySQL( $data->weight, 45);
$op_order     = $_POST['op_order'];   // $data->op_order;   
*/
$sql = "SELECT fn_insert_pet_www( ";
$sql.="'{$contact_id}','{$pet_type_id}','{$title}',";
$sql.="'{$breed}', '{$weight}', '{$op_order}') as 'res';"; 

// echo $sql; // mysqli_close($link); exit;

$result = mysqli_query($link, $sql) or die('{"message":"error3"}');  // die('[{"Error":"Problem with executing SP:' . mysqli_error($link) . '"}]'); // die('{"message":"error"}');  

//print_r($result); mysqli_close($link); // exit;

// $row    = mysqli_fetch_assoc($result);
// echo $row; mysqli_close($link); exit;
// $res    = $row['res']; // mysql_sub_id

// echo $res; mysqli_close($link); exit;

// if ( $res == 0 ){
//   mysqli_close($link);
//   die('{"message":"error"}');
// }

// update OP weight
$op_name    = ( $op_order == 0 )? "f1516" : "f1541";
$op_breed   = ( $op_order == 0 )? "f1517" : "f1542";
$op_weight  = ( $op_order == 0 )? "f1518" : "f1665";

if( $op_order == 0 ){
  $op_type_field = "f1515";  
  $op_type_value = ( $pet_type_id == "1" )? "31" : "30"; //f1515 - 30 Cat, 31 Dog;  
  // if ( $pet_type_id == "1" ){
  //   $op_type_value = "31";
  // } else {
  //   $op_type_value = "30";
  // }
} else {
  $op_type_field = "f1540";
  $op_type_value = ( $pet_type_id == "1" )? "154" : "153"; //f1540 - 153 Cat, 154 Dog;
}

$arrVar = array( 
  "id"            => $contact_id, // 0 - id  
  $op_name        => $title,
  $op_breed       => $breed,
  $op_weight      => $weight,
  $op_type_field  => $op_type_value
);

// print_r($arrVar);
$response = $clientOP->contact()->update($arrVar);
// echo $response;

$myObj = new stdClass();
$myObj->result = 1;

$myJSON = json_encode($myObj);

echo $myJSON;
mysqli_close($link);

?>
