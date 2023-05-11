<?php
/* Set to 0 if you want the session
   cookie to be set until the user closes
   the browser. Use time() + seconds
   otherwise. */

session_set_cookie_params(0);

// Initialize the session
session_start();

// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}

//Then check for the last activity time, updated each time someone visits a page.

if(($_SESSION['lastActivity'] + 300) < time()) {
    // timeout, destroy the session.
    session_destroy();
    unset($_SESSION);
    //die('Timeout!');
    header("location: login.php");
    exit;
} else {
    $_SESSION['lastActivity'] = time();
}

require(dirname(__FILE__).'/../ontraport.php');
?>
 
<!DOCTYPE html>
<html lang="en">
<head>    
    <title>Welcome</title>
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
    <!--script>

    $(function() {
        $('#arrTest').innerHTML = 'Here: Started';
        const Http = new XMLHttpRequest();  
        //var url = 'https://script.google.com/macros/s/AKfycbzrCtWiZp163i5tDL1zUKYzhfsupl01WLMn-cQlSbK2okp4w_Mg/dev?';        
        var url = 'sqlGetContact.php?clientID=43068';
        //url+= 'getCustObj=' + ContactID;                    
        Http.open( "GET", url );                
        Http.send();            
        document.getElementById('arrTest').innerHTML = 'Here: ' + url ;
        Http.onreadystatechange=(e)=>{
            document.getElementById('arrTest').innerHTML = 'Here: onreadystatechange -> ' + Http.responseText;
            var response = JSON.parse(Http.responseText);            
            
            if (!response.data) {
                document.getElementById('arrTest').innerHTML='<h4 class="text-center">Something is wrong. No data for id #'+ContactID+'</h4>';                    
            } else {                
                var arrMain = response.data;
                document.getElementById('arrTest').innerHTML = "Good";      
            }    // if                
        };
    });

    </script-->
</head>
<body>

<nav class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">            
        <div class="navbar-header">
            <a class="navbar-brand" href="#">Doctors' App</a>
        </div>        
        <ul class="nav navbar-nav">
            <li class="active"><a href="#">Home</a></li>            
            <li class="dropdown">
                <a class="dropdown-toggle" data-toggle="dropdown" href="#">Orders
                <span class="caret"></span></a>
                <ul class="dropdown-menu">
                    <li><a href="available.php">Available</a></li>
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

<div class="container">
  <h3>Any welcome message header</h3>
  <p>.. and some other text</p>
</div>

<div class="container">

    <?php
    /*
    $url = $_SESSION["urlAPI"];
    $url .= '?byField=f1869&value1=' . $_SESSION["username"] . '&obj=Doctors';
    $json = file_get_contents($url);

    $data = json_decode($json, true);
    $arrRaw = $data[data]; 
    */

    $docData = fnGetAllByField( 'f1869', '=', $_SESSION["username"], 'Doctors' );   
    $arrRaw = $docData['data'][0]; 

    $fname = trim($arrRaw['f1858']);
    $lname = trim($arrRaw['f1860']);
 
    $op_data = fnGetAllByID(20820);
    ?>  

    <div class="panel panel-default">
        <div class="panel-heading">
            <h3>Hi, <?php echo ($fname); ?>.</h3>
        </div>    
        <div class="panel-body">
            There are few options under construction on this site for Your review:
            
            <br><br>
            There is a workspace with Orders under "Orders"
          
        </div>    
    </div>
    <button type="button" class="btn btn-default" data-toggle="collapse" data-target="#arrData">
    OP raw service data  <span class="glyphicon glyphicon-chevron-down"></span></button>
    <div id="arrData" class="collapse">

        <?php
        //echo $data[0]->weather->weatherIconUrl[0]->value;    
        //Print the data out onto the page.
        //echo "data[count]: " . $data[count];
        echo "<pre>";                
        echo print_r ($arrRaw);
        echo "</pre>";
        ?>
    </div>
    
</div>

<div id="arrTest">
</div>

</body>
</html>