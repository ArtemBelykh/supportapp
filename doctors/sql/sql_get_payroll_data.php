<?php
// Initialize the session
session_start();
 
// // Check if the user is logged in, if not then redirect him to login page
// if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
//     header("location: /../login.php");
//    exit;
// }

require(dirname(__FILE__).'/../../config/config.php');

$doctor_id = 3; // $_SESSION["id"]; //3 
$tz_offset = ( isset($_GET['tz']) ) ? mysqli_real_escape_string($link, $_GET['tz']) : 0 ;

$sql = 'SELECT fn_get_payroll_by_doc_id(';
$sql.= $doctor_id . ", ";
$sql.= $tz_offset . ") as 'result';";


$result = mysqli_query($link, $sql) or die('{"message":"error"}');
$arrMain = array();
while ($row = mysqli_fetch_assoc($result)) {
    $arrMain[] = $row;
}    
//$countme = mysqli_num_rows($result);  
// *** *** *** 

//echo $sql;
$myJSON = json_encode($arrMain);

echo $myJSON;

//free resources
mysqli_free_result($result);
mysqli_close($link);
?>
