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
//$id = '';
//if( isset($_GET["id"]) ) { $id = mysqli_real_escape_string($link, $_GET['id']); };
$id = ( isset($_GET["id"]) )? mysqli_real_escape_string($link, $_GET['id']) : '';
// if( isset($_GET["id"]) ) { $id = mysqli_real_escape_string($link, $_GET['id']); };

// ***** ***** ***** ***** ***** ***** 
$sql = "SELECT * FROM v_op_contacts_01 where contact_id=".$id;
//$sql = "SELECT * FROM v_op_contacts_01 where contact_id=2240";
$result = mysqli_query($link, $sql) or die('[{"Error":"Problem with executing query:' . mysqli_error($conn) . '"}]');
$arrMain = array();
while ($row = mysqli_fetch_assoc($result)) {
    $arrMain[] = $row;
}    
//$countme = mysqli_num_rows($result);  
//echo $sql;
//$myJSON = json_encode($arrMain);

/// echo $myJSON;

// ***** ***** ***** ***** ***** ***** 
$sql_1 = "SELECT * FROM v_op_pets_01 where contact_id=".$id." AND is_active = 1;";
$result_1 = mysqli_query($link, $sql_1) or die('[{"Error":"Problem with executing query:' . mysqli_error($conn) . '"}]');
$arrMain_1 = array();
while ($row = mysqli_fetch_assoc($result_1)) {
    $arrMain_1[] = $row;
}    
//$countme = mysqli_num_rows($result_1);  
//echo $sql;
//$myJSON_1 = json_encode($arrMain_1);

// ***** ***** ***** ***** ***** ***** 

// array_push($arrMain,$arrMain_1);
//$myJSON = json_encode($arrMain);

$myObj->customer = $arrMain[0];
$myObj->pets     = $arrMain_1;

$myJSON = json_encode($myObj);

echo $myJSON;

//free resources
mysqli_free_result($result);
mysqli_close($link);
?>
