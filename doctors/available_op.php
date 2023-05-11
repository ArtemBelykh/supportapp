<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}

require(dirname(__FILE__).'/../ontraport.php');

function getAvailCustForDoc( $docID = '1' ){
    $objMe = fnGetAllByField( 'id', '=', $docID, 'Doctors' );

    if ( !is_null($objMe['data']) ) {
        $objDoctor = $objMe['data'][0];
    } else { return -1; }

    $url = 'https://api.ontraport.com/1/Contacts';

    $searchCriteria = '[{"field":{"field":"f1755"},"op":"=","value":{"value":""}},';

    $searchCriteria .= '"AND",';
    $searchCriteria .= '{"field":{"field":"id"},"op":">","value":{"value":"6300"}},';  

    // ****** \/\/\/\/ real life conditions \/\/\/\/ *******
    // OP invoices being issued
    //$searchCriteria .= '"AND",';
    //$searchCriteria .= '{"field":{"field":"mriInvoiceNum"},"op":">","value":{"value":"9000"}},';  

    // search by Doctor's State
    $searchCriteria .= '"AND",';
    $searchCriteria .= '{"field":{"field":"state"},"op":"=","value":{"value":"' . $objDoctor['f1863'] . '"}}]';  
    
    $listFields = 'firstname,lastname,state';  // weight,limit,count,day,month

    $encParams  = "?range=10&condition=" ;
    $encParams .= encodeURIComponent( $searchCriteria );
    $encParams .= "&listFields=";
    $encParams .= encodeURIComponent( $listFields );

    $response   = fnGetOntraport( $url, $encParams );

    if ( is_null($response['data']) ) { return -2; }

    return $response;
}

?>
 
<!DOCTYPE html>
<html lang="en">
<head>    
    <title>Available clients</title>
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

    table {
        background: #ffffff;
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
        }
    td, th {
        border: 1px solid #e7ebfd;
        text-align: left;
        padding: 8px;
        }    
    th { background-color: #e7ebfd }
    tr:nth-child(even) { background-color: #e7ebfd }
    tr:hover { background-color: #b7c3fb };

    </style>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
    <script>
        $(function() {
            /*const Http = new XMLHttpRequest();
            const url='https://jsonplaceholder.typicode.com/posts';
            Http.open("GET", url);
            Http.send();
            Http.onreadystatechange=(e)=>{
                //console.log(Http.responseText)
                document.getElementById('nav2').innerHTML=Http.responseText;
            }*/
            /*           
            const Http = new XMLHttpRequest();  
            //var url = 'https://script.google.com/macros/s/AKfycbzrCtWiZp163i5tDL1zUKYzhfsupl01WLMn-cQlSbK2okp4w_Mg/dev?byField=email&value1=test@sample-site.com';

            Http.open( "GET", url );                
            Http.send();            
            Http.onreadystatechange=(e)=>{
                    document.getElementById('nav2').innerHTML=Http.responseText;
            };*/              
        });//gets data from spreadsheet on document ready

    // ***********************************************************
    function handleTable(e) {
    
        //alert('Here: ' + e.target.parentNode.children[0].innerHTML );
        // to find what td element has the data you are looking for
        var ContactID = e.target.parentNode.children[0].innerHTML;
        var firstName = e.target.parentNode.children[1].innerHTML;
        var lastName  = e.target.parentNode.children[2].innerHTML;
        
        // remember ID
        //var x = location.pathname;
        window.location.href = 'clientdata.php?clientID=' + ContactID;
        //google.script.run.setGlobal( "id", ContactID );        
        // switch to nav 2
        //$('#nav_2').trigger('click');        
        //var h1='<h4 class="text-center"><i class="fa fa-spinner fa-spin"></i></h4>'
        //document.getElementById('nav2').innerHTML=h1;        
        // run query
        //google.script.run.withSuccessHandler(showContact).getQuestData(ContactID);
        
    };

        //************************************************************************
        /*function fnGetOntraport( url, encParams) {  
            
            document.getElementById('nav2').innerHTML='processing..';

            const Http = new XMLHttpRequest();  
 
            Http.open( "GET", "https://api.ontraport.com/1/object?objectID=0&id=40580" );

            Http.setRequestHeader('Accept', 'application/json');
            Http.setRequestHeader('Content-type','application/json');

            Http.setRequestHeader('Api-Key', 'G6gh62YTh8TXwvV');            
            Http.setRequestHeader('Api-Appid', '2_183266_o5FDesRKh');   
            
                   
            Http.send();
            Http.onreadystatechange=(e)=>{
                //console.log(Http.responseText)
                
                //var params = JSON.parse(Http.responseText);
                //return Http.responseText;
                document.getElementById('nav2').innerHTML=Http.responseText;
            };  
        }; //function*/

         /***************************************
        * Generate HTML query string from given object
        * Adapted from http://stackoverflow.com/a/18116302/1677912
        */
        //function toHtmlQuery_(obj) {return "?"+Object.keys(obj).reduce(function(a,k){a.push(k+'='+encodeURIComponent(obj[k]));return a},[]).join('&')};

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
                    <li  class="active"><a href="">Available</a></li>
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

    <div class="panel panel-default">
    <div class="panel-body">This is a list of customers in states of Your medical practice:</div>
    </div>
    
    <?php  
        $arrRaw = getAvailCustForDoc();
        $objCusts = $arrRaw['data'];
        if (count($objCusts) > 0): 
    ?>
    <table id="tblMain" onclick="handleTable(event)" style="cursor: pointer;"> <!-- class="table table-striped table-bordered" -->
        <thead>
            <tr>                    
                <th>ID</th><th>First Name</th><th>Last Name</th><th>State</th>
            </tr>
        </thead>
        <tbody>
            <?php  foreach( $objCusts as $row) { 
                echo '<tr>';                    
                echo '<td width="5%">'.$row['id'].'</td>';
                echo '<td width="25%">'.$row['firstname'].'</td>';
                echo '<td width="25%">'.$row['lastname'].'</td>';
                echo '<td width="15%">'.$row['state'].'</td>';
                echo '</tr>';
            } //foreach ?>
        </tbody>
    </table>
    <?php endif; ?>      

    
</div>
  

<div id="footer">
</div>

<!--div class="container">

    <?php    
    /*
    $docData = fnGetAllByField( 'f1869', '=', $_SESSION["username"], 'Doctors' );   
    $arrRaw = $docData[data][0]; 

    $fname = trim($arrRaw['f1858']);
    $lname = trim($arrRaw['f1860']);
 
    $op_data = fnGetAllByID(20820);
    */
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
</div-->

</body>
</html>