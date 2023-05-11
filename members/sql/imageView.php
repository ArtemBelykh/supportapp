<?php
// Initialize the session
session_start();
 
require(dirname(__FILE__).'/../../config/config.php');

if(isset($_GET['id'])) {
    // $sql = "SELECT image_type, image_data FROM pet_images ";
    // //$sql .= "WHERE id=" . $_GET['id'] . " AND UserID=" . $_SESSION['id'];
    // $sql .= "WHERE id=" . $_GET['id'] ;

    $sql = "SELECT image_type, image_data FROM v_pet_images_01 ";
    $sql .= "WHERE pet_id=2368";// . $pet_id ;

    $result = mysqli_query($link, $sql) or die("<b>Error:</b> Problem on Retrieving Image BLOB<br/>" . mysqli_error($conn));
    $row = mysqli_fetch_array($result);
    header("Content-type: " . $row["image_type"]);
    echo $row["image_data"];
}
mysqli_close($link);
?>