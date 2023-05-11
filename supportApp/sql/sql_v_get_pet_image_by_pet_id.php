<?php
// Initialize the session
session_start();
 
// $pet_id = '';
// if( isset($_GET["pet_id"]) ) { 
//     $pet_id = mysqli_real_escape_string($link, $_GET['pet_id']); 
// } else {
//     // die();
//     // mysqli_close($link);
//     exit;
// };
require(dirname(__FILE__).'/../../config/config.php');

$sql = "SELECT image_type, image_data FROM v_pet_images_01 ";
// $sql .= "WHERE id=" . $_GET['id'] . " AND UserID=" . $_SESSION['id'];
$sql .= "WHERE pet_id=" . $_GET['pet_id']; //$pet_id ;
$result = mysqli_query($link, $sql) or die('{"message":"error"}');
$row = mysqli_fetch_array($result);
header("Content-type: " . $row["image_type"]);
echo $row["image_data"];

mysqli_close($link);
?>