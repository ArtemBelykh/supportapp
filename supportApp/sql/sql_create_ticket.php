<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
  //header("location: /../login.php");
  die('{"message":"error0"}');  
}

if (  isset($_SESSION["id"]) ) {
  $id = $_SESSION["id"];
} else {
  die('{"message":"error0"}');
}

require(dirname(__FILE__).'/../../config/config.php');
//$id =  $_SESSION["selectedId"] ;
//$id = ( isset($_GET["id"]) )? mysqli_real_escape_string($link, $_GET['id']) : 1 ;
if ( isset($_GET['contact_id']) ){
  $contact_id = mysqli_real_escape_string($link, $_GET['contact_id']);
} else {
  die('{"message":"error1"}');
}

// retrieve POST 
// $data = json_decode( file_get_contents('php://input') );
// var_dump( $data->operation );

// $subject = $data->subject ; //  = $_POST['subject'];
// $note_body = $data->note_body; //  = $_POST['note_body'];


// $myObj = new stdClass();
// $myObj->subject = $subject;
// $myObj->note_body = $note_body;

// $myJSON = json_encode($myObj);

// echo $myJSON;
// exit;

$sql = "SELECT fn_create_ticket( $id, $contact_id ) as 'res';";
// echo $sql; die();

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
