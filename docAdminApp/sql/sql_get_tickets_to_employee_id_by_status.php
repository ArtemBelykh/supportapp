<?php
// Initialize the session
session_start();
 
// // Check if the user is logged in, if not then redirect him to login page
// if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
//     header("location: /../login.php");
//    exit;
// }


// get customer id
// $id =  $_SESSION["selectedId"] ;

if (  isset($_SESSION["id"]) ) {
  $id = $_SESSION["id"];
} else {
  die('{"message":"error0"}');
}

if (  isset($_GET["status_id"]) ) {
  $status_id = $_GET["status_id"];
} else {
  $status_id = 1;
}

require(dirname(__FILE__).'/../../config/config.php');


$sql = "SELECT fn_get_json_tickets_to_employee_by_status_id( $id, $status_id ) as 'obj';";
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
if (json_decode($arrMain[0]['obj']) === null){
  $array = [
    "note_bodies[0].from_employee_name" => "N/A",
    "subject" => "N/A",
    "dt_created" => "1970-01-01",
  ];

  $myObj->tickets = $array;
  
} else {
  $myObj->tickets = json_decode($arrMain[0]['obj']);
}

$myJSON = json_encode($myObj);

echo $myJSON;

//free resources
mysqli_free_result($result);
mysqli_close($link);
?>
