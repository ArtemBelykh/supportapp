<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
  //header("location: /../login.php");
  die('{"message":"error0"}');  
}

// if ( isset($_SESSION["id"]) ) {
//   $id = $_SESSION["id"];
// } else {
//   die('{"message":"error"}');
// }

require(dirname(__FILE__).'/../../config/config.php');

if( isset($_GET["note_id"]) ){
  $note_id = mysqli_real_escape_string($link, $_GET['note_id']) ;
} else {
  // mysqli_close($link);
  die('{"message":"error"}');
}


//$data = json_decode( file_get_contents('php://input') );
// var_dump( $data->operation );

//$subject = $data->subject ; //  = $_POST['subject'];
//$note_body = $data->note_body; //  = $_POST['note_body'];


// $myObj = new stdClass();
// $myObj->subject = $subject;
// $myObj->note_body = $note_body;

// $myJSON = json_encode($myObj);

// echo $myJSON;
// exit;

$sql = "CALL sp_update_note_to_archived( $note_id );";
// echo $sql; die();

$result = mysqli_query($link, $sql) or die('{"message":"error"}');
// $row = mysqli_fetch_assoc($result);

$myObj = new stdClass();
$myObj->result = 1;

$myJSON = json_encode($myObj);

echo $myJSON;

//free resources
mysqli_free_result($result);
mysqli_close($link);
?>
