<?php
// Initialize the session
session_start();
 
// // Check if the user is logged in, if not then redirect him to login page
// if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
//     header("location: /../login.php");
//    exit;
// }

require(dirname(__FILE__).'/../../config/config.php');


// get parameter
$note_body_id = '';
if( isset($_GET["note_body_id"]) ){
  $note_body_id = mysqli_real_escape_string($link, $_GET['note_body_id']); 
} else {   
  mysqli_close($link);  
  die('{"message":"error"}');
}

// get parameter
$to_employee_id = '';
if( isset($_GET["to_employee_id"]) ){
  $to_employee_id = mysqli_real_escape_string($link, $_GET['to_employee_id']); 
} else {   
  mysqli_close($link);  
  die('{"message":"error"}');
}


$sql = "SELECT fn_insert_note_body_recipient( $note_body_id, $to_employee_id) as 'res';";
$result = mysqli_query($link, $sql) or die('{"message":"error"}');
// $row = mysqli_fetch_assoc($result);

$arrMain = array();
while ($row = mysqli_fetch_assoc($result)) {
    $arrMain[] = $row;
}    

$myObj = new stdClass();
$myObj->result = json_decode($arrMain[0]['res']);

$myJSON = json_encode($myObj);

echo $myJSON;

//free resources
mysqli_free_result($result);
mysqli_close($link);
?>
