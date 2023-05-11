<?php
// Initialize the session
session_start();
 
// // Check if the user is logged in, if not then redirect him to login page
// if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
//     header("location: /../login.php");
//    exit;
// }

require(dirname(__FILE__).'/../../config/config.php');

// get
//$dt_start = isset( $_GET["dt_start"] ) ? mysqli_real_escape_string($link, $_GET['dt_start']) : '2020-11-20 00:00:00' ;
$doc_id   = isset( $_GET["doc_id"] )   ? mysqli_real_escape_string($link, $_GET['doc_id'])   : '3' ;

// echo $dt_start;
// echo $doc_id;
// exit;

$sql = "CALL sp_get_doc_license_by_doc_id( ".$doc_id." );";
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
