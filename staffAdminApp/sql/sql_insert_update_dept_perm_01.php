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

// get department_id
$department_id = isset($_GET["dept_id"])? mysqli_real_escape_string($link, $_GET['dept_id']) : '' ;
// get permission_zone_id
$permission_zone_id = isset($_GET["perm_zone_id"])? mysqli_real_escape_string($link, $_GET['perm_zone_id']) : '' ;
// get crud
$crud = isset($_GET["crud"]) ? mysqli_real_escape_string($link, $_GET['crud']) : '';

if ( $department_id=='' || $permission_zone_id=='' || $crud=='' ) { exit; }

// prepare sql request IN parameters
$sql = "call sp_insert_update_department_permission('";
$sql.= $department_id . "','";
$sql.= $permission_zone_id . "','";
$sql.= $crud . "');";

mysqli_query($link, $sql) or die('[{"message":"error"}]');

$myObj->message = "success";
$myJSON = json_encode($myObj);
echo $myJSON;

//free resources
//mysqli_free_result($result);
mysqli_close($link);
?>