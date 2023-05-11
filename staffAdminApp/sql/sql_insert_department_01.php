<?php
// Initialize the session
session_start();
 
// // Check if the user is logged in, if not then redirect to login page
// if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
//     header("location: /../login.php");
//     exit;
// }

require(dirname(__FILE__).'/../../config/config.php');

// **********
// get incoming parameters

// get parent_id
$parent_id = isset($_GET["parent_id"])? mysqli_real_escape_string($link, $_GET['parent_id']) : '' ;
// get name
$name = isset($_GET["name"])? mysqli_real_escape_string($link, $_GET['name']) : '' ;

// prepare sql request IN parameters
$sql = "call sp_insert_department('";

$sql.= $parent_id . "', '";
$sql.= $name . "', ";

$sql.= "@result);";

$result = mysqli_query($link, $sql) or die('[{"message":"error"}]');
// step to next result set - MySQL stored procedure specific
$link->next_result();

// Fetch OUT parameters 
if ( !($result = $link->query("SELECT @result AS result;")) )
    { die('[{"message":"error"}]'); };
//$row = $result->fetch_assoc();

// Return result
$arrMain = array();
while ($row = mysqli_fetch_assoc($result)) {
    $arrMain[] = $row;
}    
//$countme = mysqli_num_rows($result);  
// *** *** *** 

// parse array into JSON format
$myJSON = json_encode($arrMain);

// print out the JSON result
echo $myJSON;

//free resources
mysqli_free_result($result);
mysqli_close($link);
?>