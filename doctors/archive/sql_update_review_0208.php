<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: /../login.php");
   exit;
}

$doctor_id = $_SESSION["id"];

require(dirname(__FILE__).'/../../config/config.php');
require(dirname(__FILE__).'/../../config/config_op.php');

$post_data = file_get_contents('php://input');
$data = json_decode( $post_data, true );
// print_r($data);

$review_id      = $data["data"]["review_id"];
$status         = $data["data"]["status"];
//$status         = 'suspended';
$op_contact_id  = $data["data"]["op_contact_id"];
//$op_contact_id  = 2240;
$reason         = $data["data"]["reason"];
//$reason         = 'blank document';
$comments       = $data["data"]["comment"];
//$comments       = 'test message';

switch ($status) {
  case 'approved':    
    $status_id = 1;
    $requestParams = array(      
      "objectID" => 0, //ObjectType::CONTACT, // Object type ID: 0
      "id"       => $op_contact_id,             // Contact ID
      // f1706 : 357->Approved, 356->Denied, 358->Blank Document, 517->Typos or Misspellings (Please Describe) 
      "f1706"    => 357,  // Approval Status
      "f1707"    => $comments,     // Approval Notes
      "f1815"    => "1",    // Doctor Reviewed ESA
      "f1857"    => $doctor_id."369" // Doctor ID # (Status)
    );
    break;
  case 'denied':
    $status_id = 2;
    $requestParams = array(      
      "objectID" => 0, //ObjectType::CONTACT, // Object type ID: 0
      "id"       => $op_contact_id,             // Contact ID
      // f1706 : 357->Approved, 356->Denied, 358->Blank Document, 517->Typos or Misspellings (Please Describe) 
      "f1706"    => 356,  // Approval Status
      "f1707"    => $comments,     // Approval Notes
      "f1815"    => "1",    // Doctor Reviewed ESA
      "f1857"    => $doctor_id."369" // Doctor ID # (Status)      
    );
    break;

  case 'suspended':
    $status_id = 3;
    if ($reason == 'typos'){
      $requestParams = array(      
        "objectID" => 0, //ObjectType::CONTACT, // Object type ID: 0
        "id"       => $op_contact_id,             // Contact ID
        // f1706 : 357->Approved, 356->Denied, 358->Blank Document, 517->Typos or Misspellings (Please Describe) 
        "f1706"    => 517,  // Approval Status
        "f1707"    => $comments,     // Approval Notes
        "f1815"    => "1",    // Doctor Reviewed ESA
        "f1857"    => $doctor_id."369" // Doctor ID # (Status)        
      );
    } else {
      $requestParams = array(      
        "objectID" => 0, //ObjectType::CONTACT, // Object type ID: 0
        "id"       => $op_contact_id,             // Contact ID
        // f1706 : 357->Approved, 356->Denied, 358->Blank Document, 517->Typos or Misspellings (Please Describe) 
        "f1706"    => 358,  // Approval Status
        "f1707"    => $comments,     // Approval Notes
        "f1815"    => "1",    // Doctor Reviewed ESA
        "f1857"    => $doctor_id."369" // Doctor ID # (Status)        
      );
    };
    break;    
  default:
    mysqli_close($link);
    exit;
}

// $myObj->requestParams = $requestParams;
// $myJSON = json_encode($myObj);
// echo $myJSON;
// mysqli_close($link);

// send to Ontraport
$response = $clientOP->object()->update($requestParams);
$response = json_decode($response, true);
//mysqli_close($link);
//exit;

///echo $sql;
// send to MySQL
$sql = 'CALL sp_update_review_status_01( '.$review_id.' , '.$status_id.' , "'.addslashes($post_data).'" );';
$result = mysqli_query($link, $sql) or die("{'message':'error'}"); // '[{"Error":"Problem with executing query:' . mysqli_error($conn) . '"}]'

// $arrMain = array();
// while ($row = mysqli_fetch_assoc($result)) {
//     $arrMain[] = $row;
// }    
//$countme = mysqli_num_rows($result);  
// *** *** *** 

$myObj->message = "success";
///$myObj->pets     = $arrMain_1;

$myJSON = json_encode($myObj);

echo $myJSON;

// $myJSON = json_encode($arrMain);

// echo $myJSON;

//free resources
mysqli_free_result($result);
mysqli_close($link);
?>
