<?php
// Initialize the session
session_start();
 
require(dirname(__FILE__).'/../config/config.php');

    
    //$sql = "SELECT imageId FROM output_images WHERE UserID=" . $_SESSION['id'] . " ORDER BY imageId DESC"; 
    $sql = "SELECT id FROM pet_images ORDER BY id DESC LIMIT 5"; 
    $result = mysqli_query($link, $sql);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Gallery</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
    <!-- Optional theme -->
    <!--link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css"-->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- DataTables -->
    <!--link rel="stylesheet" href="https://cdn.datatables.net/1.10.16/css/dataTables.bootstrap.min.css"-->

    <link rel="stylesheet" href="basic.css">

    <style> body { padding-top:65px} </style>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
</head>
<body>

    <div class="container">
        <div class="panel panel-default">
            <div class="panel-body">
                <h2>Hi, <b><?php echo htmlspecialchars($_SESSION["username"]); ?></b>. View Your gallery here</h2>
            </div>
        </div>

        <div class="panel-group">
    <?php
        while($row = mysqli_fetch_array($result)) {
    ?>
            <div class="panel panel-default">
                <div class="panel-heading">Image Description #<?php echo $row["id"]; ?> </div>
                <div class="panel-body">
                    <img src="sql/imageView.php?id=<?php echo $row["id"]; ?>" />
                    <!-- img src="sql/sql_v_get_pet_image_by_pet_id.php?pet_id=2368" / -->
                </div>
            </div>
        
    <?php		
	    }
        mysqli_close($link);
    ?>
        </div>
    </div>

</body>
</html>