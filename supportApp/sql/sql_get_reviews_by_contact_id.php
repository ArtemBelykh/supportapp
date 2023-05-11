<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
  //header("location: /../login.php");
  die('{"message":"error0"}');  
}

require(dirname(__FILE__).'/../../config/config.php');

// get customer id
// $id = 2240;// $_SESSION["selectedId"] ;  //
//$id = ( isset($_GET["selectedId"]) )? mysqli_real_escape_string($link, $_GET['selectedId']) : $_SESSION["selectedId"] ;
$id = ( isset($_GET["selectedId"]) )? mysqli_real_escape_string($link, $_GET['selectedId']) : 2240 ;

$sql = "SELECT fn_get_json_reviews_by_contact_id_v1( ".$id." ) as 'res' ";
$result = mysqli_query($link, $sql) or die('{"message":"error"}');//die('{"Error":"Problem with executing SP:' . mysqli_error($link) . '"}');
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
