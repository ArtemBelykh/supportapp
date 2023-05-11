<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
  //header("location: /../login.php");
  die('{"message":"error0"}');  
}

require(dirname(__FILE__).'/../../config/config.php');


// get parameter
$ticket_id = '';
if( isset($_GET["ticket_id"]) ){
  $ticket_id = mysqli_real_escape_string($link, $_GET['ticket_id']); 
} else {   
  mysqli_close($link);  
  die('{"message":"error"}');
}

// get parameter
$tag_id = '';
if( isset($_GET["tag_id"]) ){
  $tag_id = mysqli_real_escape_string($link, $_GET['tag_id']); 
} else {   
  mysqli_close($link);  
  die('{"message":"error"}');
}

$sql = "CALL sp_insert_support_ticket_tag( $tag_id, $ticket_id);";
$result = mysqli_query($link, $sql) or die('{"message":"error"}');
// $row = mysqli_fetch_assoc($result);

// $arrMain = array();
// while ($row = mysqli_fetch_assoc($result)) {
//     $arrMain[] = $row;
// }    

$myObj = new stdClass();
$myObj->result = 1;

$myJSON = json_encode($myObj);

echo $myJSON;

//free resources
mysqli_free_result($result);
mysqli_close($link);
?>
