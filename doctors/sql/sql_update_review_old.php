<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect him to login page
// if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
//     header("location: /../login.php");
//    exit;
// }

require(dirname(__FILE__).'/../../config/config.php');

$post_data = file_get_contents('php://input');
$data = json_decode( $post_data, true );
//print_r($data);

$review_id = $data["data"]["review_id"];
$status = $data["data"]["status"];

/// echo $post_data;

switch ($status) {
  case 'approved':    
    $status_id = 1;
    break;
  case 'denied':
    $status_id = 2;
    break;
  case 'suspended':
    $status_id = 3;
    break;    
  default:
    mysqli_close($link);
    exit;
}
// echo $review_id;
// echo $status_id;
// echo $post_data;

$sql = 'CALL sp_update_review_status_01( '.$review_id.' , '.$status_id.' , "'.addslashes($post_data).'" );';
///echo $sql;

$result = mysqli_query($link, $sql) or die("{'message':'error'}"); // '[{"Error":"Problem with executing query:' . mysqli_error($conn) . '"}]'
// $arrMain = array();
// while ($row = mysqli_fetch_assoc($result)) {
//     $arrMain[] = $row;
// }    
//$countme = mysqli_num_rows($result);  
// *** *** *** 

$myObj->message = "success";
///$myObj->pets     = $arrMain_1;

$myJSON = json_encode($myObj);

echo $myJSON;

// $myJSON = json_encode($arrMain);

// echo $myJSON;

//free resources
mysqli_free_result($result);
mysqli_close($link);
?>
