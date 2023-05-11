<?php
// Initialize the session
// session_start();
 
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
//   //free resources
//   // mysqli_free_result($result);
//   mysqli_close($link);
//   // exit
//   die('{"message":"error0"}');

// }

$sql = "select fn_get_json_item_colors() as 'res';";
$result = mysqli_query($link, $sql) or die('{"message":"error1"}'); // die('[{"Error":"Problem with executing SP:' . mysqli_error($conn) . '"}]'); // die('{"message":"error1"}');
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
