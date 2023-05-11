<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: /../login.php");
    exit;
};

require(dirname(__FILE__).'/../config/config.php');
require(dirname(__FILE__).'/../config/config_op.php');

// **********
// get incoming parameters

// get id
$id = '';
if( isset($_GET["id"]) ) { $id = mysqli_real_escape_string($link, $_GET['id']); };
// get op_id
$op_id = '';
if( isset($_GET["op_id"]) ) { $op_id = mysqli_real_escape_string($link, $_GET['op_id']); };

// get titleFull -- f1939
$titleFull = '';
if( isset($_GET["titleFull"]) ) { $titleFull = mysqli_real_escape_string($link, $_GET['titleFull']); };
// get titleShort -- f1940
$titleShort = '';
if( isset($_GET["titleShort"]) ) { $titleShort = mysqli_real_escape_string($link, $_GET['titleShort']); };

// get licNum -- f1941
$licNum = '0';
if( isset($_GET["licNum"]) ) { $licNum = mysqli_real_escape_string($link, $_GET['licNum']); };
// get licState -- f1945
$licState = '';
if( isset($_GET["licState"]) ) { $licState = mysqli_real_escape_string($link, $_GET['licState']); };
// get licStateWght -- f2205
$licStateWght = '';
if( isset($_GET["licStateWght"]) ) { $licStateWght = mysqli_real_escape_string($link, $_GET['licStateWght']); };

// get licStart -- f1942
$licStart = '';
if( isset($_GET["licStart"]) ) { $licStart = mysqli_real_escape_string($link, $_GET['licStart']); };
// get licExpry -- f2279
$licExpry = '';
if( isset($_GET["licExpry"]) ) { $licExpry = mysqli_real_escape_string($link, $_GET['licExpry']); };
// **********

// prepare sql request IN parameters
$sql = "call sp_update_doctor_license_by_id_www_01('";

$sql.= $id . "','";

$sql.= $titleFull . "','";
$sql.= $titleShort . "','";

$sql.= $licNum . "','";
$sql.= $licState . "','";
$sql.= $licStateWght . "','";

$sql.= $licStart . "','";
$sql.= $licExpry . "',";

$sql.= "@result);";

$result = mysqli_query($link, $sql) or die('[{"Error":"Problem with executing SP:' . mysqli_error($conn) . '"}]');
// step to next result set - MySQL stored procedure specific
$link->next_result();

// Fetch OUT parameters 
if ( !($result = $link->query("SELECT @result AS result;")) )
    { die('[{"Error":"Fetch failed: (' . $link->errno . ') ' . $link->error . '"}]'); };
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

// *** *** ***
if ( $op_id == '' ){ exit; };

$str      = explode( "-", $licStart );     // "2014-02-14"
$licStart = $str[1]."/".$str[2]."/".$str[0];

$str      = explode( "-", $licExpry );     // "2014-02-14"
$licExpry = $str[1]."/".$str[2]."/".$str[0];

//update an OP entry
$requestParams = array(
    "objectID"  => 10003, // Object type ID: 10003  - DoctorLicense
    "id"        => $op_id,
    
    "f1939"     => $titleFull,  // titleFull
    "f1940"     => $titleShort, // titleShort

    "f1941"     => $licNum,
    "f1945"     => $licState,
    "f2205"     => $licStateWght,

    "f1942"     => $licStart,
    "f2279"     => $licExpry
);
$response = $clientOP->object()->update($requestParams);
// $response = json_decode($response, true);

//free resources
mysqli_free_result($result);
mysqli_close($link);
?>
