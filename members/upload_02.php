<?php
// Initialize the session
session_start();

require(dirname(__FILE__).'/../config/config.php');

// Check if the user is logged in, if not then redirect him to login page
// if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
//     header("location: login.php");
//     exit;
// }

if(count($_FILES) > 0) {    
    if(is_uploaded_file($_FILES['userImage']['tmp_name'])) {    
        //require_once "config.php";
        $imgData = addslashes(file_get_contents($_FILES['userImage']['tmp_name']));
        $imageProperties = getimageSize($_FILES['userImage']['tmp_name']);
        /*
        $sql = "INSERT INTO  pet_images(pet_id, image_type ,image_data)";
        //VALUES('{$imageProperties['mime']}', '{$imgData}', '{$_SESSION['id']}')";
        $sql .= "VALUES( '2368', '{$imageProperties['mime']}', '{$imgData}')";
        $current_id = mysqli_query($link, $sql) or die("<b>Error:</b> Problem on Image Insert<br/>" . mysqli_error($link));
        mysqli_close($link);
        if(isset($current_id)) {
            header("Location: gallery.php");
        };
        */
        
    };
};
?>