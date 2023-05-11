<?php
 require(dirname(__FILE__).'/../config/lostpets.php');

    $image  = $_POST['image'];
    $type   = $_POST['type'];
    $pet_id = $_POST['id'];
 
    $imgData = addslashes(base64_decode($image));
  
    $sql = "CALL sp_insert_pet_image_01( '{$pet_id}', '{$type}',  '{$imgData}', @out );"; //  SELECT @out AS result;  
    $current_id = mysqli_query($link, $sql) or die('{"message":"error"}');    
    mysqli_close($link);
    // if(isset($current_id)) {
    //     header("Location: gallery.php");
    // };
    echo $current_id; 
?>