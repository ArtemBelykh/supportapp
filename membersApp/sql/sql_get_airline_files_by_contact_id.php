<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    //header("location: /../login.php");
    die('{"message":"error0"}');  
  }

require(dirname(__FILE__).'/../../config/config.php');

// get customer id
// $id = ( isset($_GET["id"]) )? mysqli_real_escape_string($link, $_GET['id']) : $_SESSION["sessionId"] ;
$id =  $_SESSION["selectedId"] ;

$sql = 'CALL sp_get_airline_files_by_contact_id('.$id.');';
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
