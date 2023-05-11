<?php
// Initialize the session
session_start();

require(dirname(__FILE__).'/../config/config_lostpets.php');

// Check if the user is logged in, if not then redirect him to login page
// if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
//     header("location: login.php");
//     exit;
// }
?>
 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Upload</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css" />
    <link href="basic.css" rel="stylesheet" type="text/css" />
    
    <style> body { padding-top:65px} </style>
</head>
<body>

    <div class="panel panel-default">

        <?php
        if(count($_FILES) > 0) {
            if(is_uploaded_file($_FILES['userImage']['tmp_name'])) {
                //require_once "config.php";
                $imgData = addslashes(file_get_contents($_FILES['userImage']['tmp_name']));
                $imageProperties = getimageSize($_FILES['userImage']['tmp_name']);
                
                $sql = "INSERT INTO profile_images(image_type ,image_data)";
                //VALUES('{$imageProperties['mime']}', '{$imgData}', '{$_SESSION['id']}')";
                $sql .= "VALUES('{$imageProperties['mime']}', '{$imgData}')";
                $current_id = mysqli_query($link, $sql) or die("<b>Error:</b> Problem on Image Insert<br/>" . mysqli_error($link));
                mysqli_close($link);
                if(isset($current_id)) {
                    header("Location: gallery.php");
                };
                
            };
        };
        ?>

        <form name="frmImage" enctype="multipart/form-data" action="" method="post" class="frmImageUpload">

            <label>Upload Image File:</label><br/>
            <input name="userImage" type="file" class="inputFile" />
            <input type="submit" value="Submit" class="btnSubmit" />
        </form>

    </div>

</body>
</html>