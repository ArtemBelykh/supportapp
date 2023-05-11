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
$id = '';
if( isset($_GET["id"]) ) { $id = mysqli_real_escape_string($link, $_GET['id']); };

// *** *** *** 
// $sql = "SELECT * FROM v_op_contacts_01 where contact_id=".$id;
$sql_1 = "SELECT * FROM v_op_contacts_01 where contact_id=2240";
$result_1 = mysqli_query($link, $sql_1) or die('[{"Error":"Problem with executing query:' . mysqli_error($conn) . '"}]');
$arrMain_1 = array();
while ($row = mysqli_fetch_assoc($result_1)) {
    $arrMain_1[] = $row;
}    
//$countme = mysqli_num_rows($result);  
// *** *** *** 

// *** *** *** 
// $sql = "SELECT * FROM v_op_contacts_01 where contact_id=".$id;
$sql_2 = "SELECT * FROM v_addresses_01 where contact_id=2240 ";
$sql_2.= " ORDER BY dlm DESC LIMIT 1";
$result_2 = mysqli_query($link, $sql_2) or die('[{"Error":"Problem with executing query:' . mysqli_error($conn) . '"}]');
$arrMain_2 = array();
while ($row = mysqli_fetch_assoc($result_2)) {
    $arrMain_2[] = $row;
}    
//$countme = mysqli_num_rows($result);  
// *** *** *** 


$myObj->customer = $arrMain_1[0];
$myObj->address  = $arrMain_2[0];

$myJSON = json_encode($myObj);

echo $myJSON;

//free resources
mysqli_free_result($result);
mysqli_close($link);
?>
