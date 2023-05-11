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

// get id
$id = isset($_GET["id"])? mysqli_real_escape_string($link, $_GET['id']) : '' ;
// get parent_id
$parent_id = isset($_GET["parent_id"])? mysqli_real_escape_string($link, $_GET['parent_id']) : '' ;
// get name
$name = isset($_GET["name"])? mysqli_real_escape_string($link, $_GET['name']) : '' ;

// prepare sql request IN parameters
$sql = "call sp_update_department_01(";

$sql.= $id . ",";
$sql.= $parent_id . ",'";
$sql.= $name . "')";

mysqli_query($link, $sql) or die('[{"message":"error"}]');

$myObj->message = "success";
$myJSON = json_encode($myObj);
echo $myJSON;

//free resources
//mysqli_free_result($result);
mysqli_close($link);
?>