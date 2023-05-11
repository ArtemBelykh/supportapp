<?php
// Initialize the session
session_start();

// // Check if the user is logged in, if not then redirect him to login page
// if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
//     header("location: /../login.php");
//    exit;
// }

require(dirname(__FILE__).'/../../config/config.php');

$doctor_id = $_SESSION["id"];

// get customer id
$name = ( isset($_GET["name"]) )? substr( $_GET["name"] , 0 , 128) : 'nonetofind';
// if( isset($_GET["id"]) ) { $id = mysqli_real_escape_string($link, $_GET['id']); };


//$sql_1      = "SELECT fn_count_contacts_by_name( '".$name."' ) as 'count'; ";
$sql_1      = "SELECT fn_count_approved_contacts_by_doc_by_name( '$name', $doctor_id ) as 'count'; ";
$result_1   = mysqli_query($link, $sql_1) or die("{'message':'error'}"); 
$arrMain_1  = array();
while ($row = mysqli_fetch_assoc($result_1)) {
    $arrMain_1[] = $row;
}    
//$countme = mysqli_num_rows($result);  
// *** *** *** 

// $myJSON = json_encode($arrMain_1[0]['count']);
// echo $myJSON; // exit;

// $sql_2      = "CALL sp_search_contacts_by_name( '" . $name . "' );";
$sql_2      = "CALL sp_search_approved_contacts_by_doc_by_name( '$name', $doctor_id );";
$result_2   = mysqli_query($link, $sql_2) or die("{'message':'error'}"); 
$arrMain_2  = array();
while ($row = mysqli_fetch_assoc($result_2)) {
    $arrMain_2[] = $row;
}    

//$countme = mysqli_num_rows($result);  
// *** *** *** 

// $myJSON = json_encode($arrMain_2);
// echo $myJSON; exit;

$myObj->count = $arrMain_1[0]['count'];
$myObj->results  = $arrMain_2;

$myJSON = json_encode($myObj);
echo $myJSON;


//free resources
mysqli_free_result($result_1);
mysqli_free_result($result_2);
mysqli_close($link);
?>