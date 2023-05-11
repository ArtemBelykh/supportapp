<?php
// Initialize the session
session_start();
 
// // Check if the user is logged in, if not then redirect him to login page
// if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
//     header("location: /../login.php");
//    exit;
// }

require(dirname(__FILE__).'/../../config/config.php');

$docID  = '0';
if(isset($_GET["docID"])){
    $docID  = mysqli_real_escape_string($link, $_GET['docID']);
    $sql = "SELECT * FROM v_doctor_licenses_www_01 WHERE doctors_id=".$docID.";" ;
} else {
    $sql = "SELECT * FROM v_doctor_licenses_www_01 WHERE doctors_id<0;" ;
}

$result = mysqli_query($link, $sql) or die('[{"Error":"Problem with executing SP:' . mysqli_error($conn) . '"}]');
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
