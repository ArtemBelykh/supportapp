<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect him to login page
// if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
//     header("location: /../login.php");
//     exit;
// }

require(dirname(__FILE__).'/../../config/config.php');

//$myVar0  = 'Beter set "?param1=" in URL query';
//if(isset($_GET["param1"])){
//    $myVar0  = mysqli_real_escape_string($link, $_GET['param1']);
//}

$sql = "SELECT * FROM v_doctors_www_01;";
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
