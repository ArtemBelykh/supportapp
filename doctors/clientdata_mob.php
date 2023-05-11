<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect him to login page
// if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
//     header("location: login.php");
//     exit;
// }

//$clientID=$_GET['clientID'];

require_once "config.php";
if(isset($_GET['clientID'])) {
    $sql = "SELECT * FROM v_ontraport_01 ";
    $sql .= "WHERE id=" . $_GET['clientID'];
    $result = mysqli_query($link, $sql) or die("<b>Error:</b> Problem on Retrieving Image BLOB<br/>" . mysqli_error($conn));
    $arrMain = mysqli_fetch_array($result);
    //header("Content-type: " . $row["imageType"]);
    //echo $row["imageData"];
}
/*
mysqli_close($link);

require_once "config.php";
*/
    $sql = "SELECT * FROM ontraport_doctors ";
    $sql .= "WHERE id=1";
    $result1 = mysqli_query($link, $sql) or die("<b>Error:</b> Problem on Retrieving Image BLOB<br/>" . mysqli_error($conn));
    $arrDoc = mysqli_fetch_array($result1);
    //header("Content-type: " . $row["imageType"]);
    //echo $row["imageData"];

mysqli_close($link);
?>
 
<!DOCTYPE html>
<html lang="en">
<head>    
    <title>Client data</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- DataTables -->
    <!--link rel="stylesheet" href="https://cdn.datatables.net/1.10.16/css/dataTables.bootstrap.min.css"-->

    <link rel="stylesheet" href="/../basic.css">
    <style> 
        body { padding-top:65px};
    </style>
 
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
    <script>
        $(function() {
            //var clientID = <?php echo $clientID; ?>;
            //alert('Data for Client #' + clientID + ' is almost on this page');
        });//gets data from spreadsheet on document ready
    </script>
</head>
<body>

<nav class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">            
        <div class="navbar-header">
            <a class="navbar-brand" href="#">Doctors' App</a>
        </div>        
        <ul class="nav navbar-nav">
            <li><a href="welcome.php">Home</a></li>            
            <li class="dropdown">
                <a class="dropdown-toggle" data-toggle="dropdown" href="#">Orders
                <span class="caret"></span></a>
                <ul class="dropdown-menu">
                    <li  class="active"><a href="available.php">Available</a></li>
                    <li><a href="">Pending</a></li>
                    <li><a href="">Approved</a></li>
                    <li><a href="">Custom</a></li>
                </ul>
            </li> 
            <li><a href="#">Messages</a></li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
            <li class="dropdown">
                <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                <span class="glyphicon glyphicon-user"></span>  Profile <span class="caret"></span></a>
                <ul class="dropdown-menu">
                    <li><a href="">User info</a></li>
                    <li><a href="reset-password.php">Reset Password</a></li>
                </ul>
            </li>
            <li><a href="logout.php"><span class="glyphicon glyphicon-log-out"></span>  SignOut</a></li>
        </ul><br>
    </div>
</nav>

<?php
    /*$url = 'https://script.google.com/macros/s/AKfycbzrCtWiZp163i5tDL1zUKYzhfsupl01WLMn-cQlSbK2okp4w_Mg/dev?getCustObj=';
    $url .= $clientID;
    $json = file_get_contents($url);
    //echo "json:" . $json;

    $data = json_decode($json, true);
    $arrMain = $data[data];*/
?>
<div class="container">
    <div class="panel-group">
        <div class="panel panel-default">  
            <div class="panel-heading">
                <h4 class="panel-title">
                    <a data-toggle="collapse" href="#collapse1">Personal data</a><span class="caret"></span>
                </h4>
            </div>
            <div id="collapse1" class="panel-collapse collapse">
                <ul class="list-group1">
                <li class="list-group-item"><strong>Name:</strong> <?php echo $arrMain['firstname'].' '.$arrMain['lastname']; ?></li>
                    <li class="list-group-item"><strong>Gender:</strong> <?php echo $arrMain['gender']; ?></li>
                    <li class="list-group-item"><strong>Phone:</strong> <?php echo $arrMain['phone']; ?></li>  
                    <li class="list-group-item"><strong>City:</strong> <?php echo $arrMain['city']; ?></li>  
                    <li class="list-group-item"><strong>State:</strong> <?php echo $arrMain['state']; ?></li>                               
                </ul>
            </div>  
  
            <div class="panel-heading">            
                <h4 class="panel-title">
                    <a data-toggle="collapse" href="#collapse2">Pet data</a><span class="caret"></span>
                </h4>
            </div>
            <?php 
            $pet1 = $arrMain['pet1_type'].' - "'.$arrMain['pet1_name'].'" ('.$arrMain['pet1_breed'].') approx. weigh: '.$arrMain['pet1_wght'];
            $pet2 = $arrMain['pet2_type'].' - "'.$arrMain['pet2_name'].'" ('.$arrMain['pet2_breed'].') approx. weigh: '.$arrMain['pet2_wght'];
            ?>
            <div id="collapse2" class="panel-collapse collapse">
                <ul class="list-group2">
                    <li class="list-group-item"><strong>Pet #1:</strong></li>
                    <li class="list-group-item"><?php echo $pet1; ?></li>
                    <li class="list-group-item"><strong>Pet #2:</strong></li>
                    <li class="list-group-item"><?php echo $pet2; ?></li>
                </ul>
            </div>
  
            <div class="panel-heading">
                <h4 class="panel-title">
                    <a data-toggle="collapse" href="#collapse3">Questionnaire<span class="caret"></span></a>
                </h4>
            </div>
            <div id="collapse3" class="panel-collapse collapse">
                <ul class="list-group2">
                <li class="list-group-item"><strong>Life Events:</strong> <?php echo $arrMain['le']; ?></li>
                    <li class="list-group-item"><strong>Felt Angry:</strong> <?php echo $arrMain['fa']; ?></li>
                    <li class="list-group-item"><strong>Irregular Sleep:</strong> <?php echo $arrMain['irrs']; ?></li>
                    <li class="list-group-item"><strong>Feel Pain:</strong> <?php echo $arrMain['pain']; ?></li>
                    <li class="list-group-item"><strong>Being Nervous:</strong> <?php echo $arrMain['nerv']; ?></li>
                    <li class="list-group-item"><strong>Detached or Distant:</strong> <?php echo $arrMain['dedi']; ?></li>
                    <li class="list-group-item"><strong>Loss of Interest:</strong> <?php echo $arrMain['loss']; ?></li>
                    <li class="list-group-item"><strong>Felt Worried:</strong> <?php echo $arrMain['felt']; ?></li>
                    <li class="list-group-item"><strong>Outbursts or Mood:</strong> <?php echo $arrMain['outm']; ?></li>
                    <li class="list-group-item"><strong>Illness Not Taken Seriously:</strong> <?php echo $arrMain['ills']; ?></li>
                    <li class="list-group-item"><strong>Being Compulsive:</strong> <?php echo $arrMain['comp']; ?></li>
                    <li class="list-group-item"><strong>Feeling Sad:</strong> <?php echo $arrMain['fesa']; ?></li>
                    <li class="list-group-item"><strong>Felt Panicked:</strong> <?php echo $arrMain['fepa']; ?></li>
                    <li class="list-group-item"><strong>Being Impulsive:</strong> <?php echo $arrMain['impu']; ?></li>
                    <li class="list-group-item"><strong>Feeling Paranoid:</strong> <?php echo $arrMain['para']; ?></li>
                    <li class="list-group-item"><strong>Memory Loss:</strong> <?php echo $arrMain['memo']; ?></li>
                    <li class="list-group-item"><strong>Why Get ESA:</strong> <?php echo $arrMain['why']; ?></li>
                </ul>
            </div>
            <!--div class="panel-footer">Footer</div-->
        </div>
    </div>
</div>
<?php
        //echo $data[0]->weather->weatherIconUrl[0]->value;    
        echo $arrDoc['f1858'];
        //Print the data out onto the page.
        //echo "data[count]: " . $data[count];
        //echo "<pre>";                
        //echo print_r ($arrDoc['']);
        //echo "</pre>";
?>
<div class="row">
    <div class="col-sm-1"></div>
    <div class="col-sm-4">
        <div class="checkbox">
            <label><input type="checkbox" value="">Customer name misspelled</label>
        </div>
        <div class="checkbox">
            <label><input type="checkbox" value="">Pet name misspelled</label>
        </div>
        <div class="checkbox disabled">
            <label><input type="checkbox" value="" disabled>Option 3</label>
        </div>
        <div class="form-group">
            <label for="comment">Comment:</label>
            <textarea class="form-control" rows="2" cols="10" id="comment1"></textarea>
        </div>  
    </div>
    <div class="col-sm-2">
    </div>
    <div class="col-sm-4">
        <div class="checkbox">
            <label><input type="checkbox" value="">No real reason for ESA</label>
        </div>
        <div class="checkbox">
            <label><input type="checkbox" value="">Customer answers to questions nor warranted</label>
        </div>
        <div class="checkbox disabled">
            <label><input type="checkbox" value="" disabled>Option 3</label>
        </div>
        <div class="form-group">
            <label for="comment">Comment:</label>
            <textarea class="form-control" rows="2" cols="10" id="comment2"></textarea>
        </div> 
    </div>
    <div class="col-sm-1"></div>
</div>
  
<div class="row">
    <div class="col-sm-6 text-center">
        <a href="#" class="btn btn-primary btn-lg"><span class="glyphicon glyphicon-ok"></span> Approve </a>
    </div>
    <div class="col-sm-6 text-center">
        <a href="#" class="btn btn-primary btn-lg"><span class="glyphicon glyphicon-remove"></span> Decline </a>
    </div>
</div>
  

</body>
</html>