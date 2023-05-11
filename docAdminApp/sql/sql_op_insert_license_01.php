<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: /../login.php");
    exit;
}

require(dirname(__FILE__).'/../config/config.php');
require(dirname(__FILE__).'/../config/config_op.php');

// **********
// get incoming parameters

// get doctor_id -- f1944
$docID = '';
if( isset($_GET["docID"]) ) { $docID = mysqli_real_escape_string($link, $_GET['docID']); };

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

// **********
// prepare sql request IN parameters
$sql = "call sp_insert_doctor_license_www_01('";

$sql.= $docID . "','";

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
 
// parse array into JSON format
$myJSON = json_encode($arrMain);

// print out the JSON result
echo $myJSON;

// extract created MySQL DoctorLicense ID
$newID = $arrMain[0]["result"];
if ( $newID == '' ){ exit; };
// *** *** ***

// *** *** ***
//create an OP entry

$str      = explode( "-", $licStart );     // "2014-02-14"
$licStart = $str[1]."/".$str[2]."/".$str[0];

$str      = explode( "-", $licExpry );     // "2014-02-14"
$licExpry = $str[1]."/".$str[2]."/".$str[0];

$requestParams = array(
    "objectID"  => 10003, // Object type ID: 10003  - DoctorLicense    
    "f1944"     => $docID, // doc_id

    "f1939"     => $titleFull,  // titleFull
    "f1940"     => $titleShort, // titleShort

    "f1941"     => $licNum,
    "f1945"     => $licState,
    "f2205"     => $licStateWght,

    "f1942"     => $licStart,
    "f2279"     => $licExpry
);
$response = $clientOP->object()->create($requestParams);

// get OP Doctor License ID from it
$response = json_decode($response, true);
$opID = $response["data"]["id"];
// *** *** ***

// *** *** ***
// update MySql with created OP_ID
$sql = $sql = "call sp_update_doctor_license_op_id_by_id_www_01(";
$sql.= $newID . ",";
$sql.= $opID . ",";
$sql.= "@result);";

$result = mysqli_query($link, $sql) or die('[{"Error":"Problem with executing SP:' . mysqli_error($conn) . '"}]');
// step to next result set - MySQL stored procedure specific
$link->next_result();

// Fetch OUT parameters 
if ( !($result = $link->query("SELECT @result AS result;")) )
    { die('[{"Error":"Fetch failed: (' . $link->errno . ') ' . $link->error . '"}]'); };
//$row = $result->fetch_assoc();

//free resources
mysqli_free_result($result);
mysqli_close($link);
?>
