<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: /../login.php");
   exit;
}

require(dirname(__FILE__).'/../../config/config.php');

// get 
$value = '';
if( isset($_GET["value"]) ){
  $value = mysqli_real_escape_string($link, $_GET['value']); 

} else { 
  //free resources
  mysqli_free_result($result);
  mysqli_close($link);
  // exit
  exit('{"message":"error"}');

}

$sql = "call sp_search_contacts_by_email( '$value' );";
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
