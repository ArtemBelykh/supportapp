<?php
// Initialize the session
session_start();
 
// // Check if the user is logged in, if not then redirect him to login page
// if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
//     header("location: /../login.php");
//    exit;
// }

require(dirname(__FILE__).'/../../config/config.php');

// get customer id
// $id =  $_SESSION["selectedId"] ;
$id = ( isset($_GET["id"]) )? mysqli_real_escape_string($link, $_GET['id']) : 1 ;

$sql = "SELECT fn_get_json_note_body_w_recipients( $id ) as 'note';";
// $sql = "SELECT * FROM v_op_contacts_01 where contact_id=2240";
$result = mysqli_query($link, $sql) or die('{"message":"error"}');
// $row = mysqli_fetch_assoc($result);

$arrMain = array();
while ($row = mysqli_fetch_assoc($result)) {
    $arrMain[] = $row;
}    
//$countme = mysqli_num_rows($result);  
// *** *** *** 

//echo $sql;
// $myJSON = json_encode($row);
// echo stripslashes($myJSON);
$myObj = new stdClass();
$myObj->note = json_decode($arrMain[0]['note']);

$myJSON = json_encode($myObj);

echo $myJSON;

//free resources
mysqli_free_result($result);
mysqli_close($link);
?>
