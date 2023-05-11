<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
  //header("location: /../login.php");
  die('{"message":"error0"}');  
}

require(dirname(__FILE__).'/../../config/config.php');

if (  isset($_SESSION["id"]) ) {
  $id = $_SESSION["id"];
} else {
  die('{"message":"error0"}');
}

// get parameter
$ticket_id = '';
if( isset($_GET["ticket_id"]) ){
  $ticket_id = mysqli_real_escape_string($link, $_GET['ticket_id']); 
} else {   
  mysqli_close($link);  
  die('{"message":"error1"}');
}

// get parameter
$status_id = '';
if( isset($_GET["status_id"]) ){
  $status_id = mysqli_real_escape_string($link, $_GET['status_id']); 
} else {   
  mysqli_close($link);  
  die('{"message":"error2"}');  
}

$sql = "SELECT fn_update_support_ticket_status( $ticket_id, $status_id, $id ) as 'res';";
// echo $sql; die();

$result = mysqli_query($link, $sql) or die('{"message":"error3"}');
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
