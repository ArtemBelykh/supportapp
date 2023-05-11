<?php
// Initialize the session
session_start();
 
// // Check if the user is logged in, if not then redirect him to login page
// if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
//     header("location: /../login.php");
//    exit;
// }

require(dirname(__FILE__).'/../../config/config.php');

// // get 
// if( isset($_GET["id"]) ){
//   $id = mysqli_real_escape_string($link, $_GET['id']); 
// } else { 
//   $id = 12;
//   // mysqli_close($link);  
//   // die('{"message":"error0"}');
// }

// get selectedItemId
if( isset($_SESSION["selectedProductId"]) ){
  $id = $_SESSION["selectedProductId"];
} else {
 // $selectedItemId = 2240; 
 die('{"message":"error"}');
} 

$sql = "select fn_get_json_product_by_id( '$id' ) as 'res';";
$result = mysqli_query($link, $sql) or die('[{"Error":"Problem with executing SP:' . mysqli_error($conn) . '"}]'); // die('{"message":"error1"}');
$row    = mysqli_fetch_assoc($result);
$res    = $row['res']; // mysql_sub_id

echo $res;  
// $myObj = new stdClass();
// $myObj->result = json_decode($res);

// $myJSON = json_encode($myObj);

// echo $myJSON;

//free resources
mysqli_free_result($result);
mysqli_close($link);
?>
