<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
  //header("location: /../login.php");
  die('{"message":"error0"}');  
}


// get customer id
// $id =  $_SESSION["selectedId"] ;

if (  isset($_SESSION["id"]) ) {
  $id = $_SESSION["id"];
} else {
  die('{"message":"error0"}');
}

// if (  isset($_GET["status_id"]) ) {
//   $status_id = $_GET["status_id"];
// } else {
//   $status_id = 1;
// }

require(dirname(__FILE__).'/../../config/config.php');


$sql = "SELECT fn_count_incoming_notes_by_user_id( $id ) as 'res';";
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
