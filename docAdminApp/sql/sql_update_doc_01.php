<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: /../login.php");
    exit;
}

require(dirname(__FILE__).'/../config/config.php');

// **********
// get incoming parameters

// get id -- mysql id
$id = '';
if( isset($_GET["id"]) ) { $id = mysqli_real_escape_string($link, $_GET['id']); };
// get op_id -- ontraport id
$op_id = '';
if( isset($_GET["op_id"]) ) { $op_id = mysqli_real_escape_string($link, $_GET['op_id']); };

// get fname -- f1858
$fname = '';
if( isset($_GET["fname"]) ) { $fname = mysqli_real_escape_string($link, $_GET['fname']); };
// get mname -- f1859
$mname = '';
if( isset($_GET["mname"]) ) { $mname = mysqli_real_escape_string($link, $_GET['mname']); };
// get lname -- f1860
$lname = '';
if( isset($_GET["lname"]) ) { $lname = mysqli_real_escape_string($link, $_GET['lname']); };

// get isActive -- f1878
$isActive = '0';
if( isset($_GET["isActive"]) ) { $isActive = mysqli_real_escape_string($link, $_GET['isActive']); };
// get login -- f1888
$login = '';
if( isset($_GET["login"]) ) { $login = mysqli_real_escape_string($link, $_GET['login']); };
// get psswd -- psswd
$psswd = '';
if( isset($_GET["psswd"]) ) { 
    $password = mysqli_real_escape_string($link, $_GET['psswd']); 
    $psswd = password_hash($password, PASSWORD_DEFAULT); // Creates a password hash
};

// get address -- f1861
$address = '';
if( isset($_GET["address"]) ) { $address = mysqli_real_escape_string($link, $_GET['address']); };
// get city -- f1862
$city = '';
if( isset($_GET["city"]) ) { $city = mysqli_real_escape_string($link, $_GET['city']); };
// get state -- f1863
$state = '';
if( isset($_GET["state"]) ) { $state = mysqli_real_escape_string($link, $_GET['state']); };
// get zip -- f1864
$zip = '';
if( isset($_GET["zip"]) ) { $zip = mysqli_real_escape_string($link, $_GET['zip']); };

// get smsNum -- f1867
$smsNum = '';
if( isset($_GET["smsNum"]) ) { $smsNum = mysqli_real_escape_string($link, $_GET['smsNum']); };
// get phoneService -- f1879
$phoneService = '';
if( isset($_GET["phoneService"]) ) { $phoneService = mysqli_real_escape_string($link, $_GET['phoneService']); };
// get phonePublic -- f1880
$phonePublic = '';
if( isset($_GET["phonePublic"]) ) { $phonePublic = mysqli_real_escape_string($link, $_GET['phonePublic']); }

// get emailService -- f1869
$emailService = '';
if( isset($_GET["emailService"]) ) { $emailService = mysqli_real_escape_string($link, $_GET['emailService']); }
// get emailPublic -- f1886
$emailPublic = '';
if( isset($_GET["emailPublic"]) ) { $emailPublic = mysqli_real_escape_string($link, $_GET['emailPublic']); }

// get npi -- f1872
$npi = '0';
if( isset($_GET["npi"]) ) { $npi = mysqli_real_escape_string($link, $_GET['npi']); }
// get titelFull -- f1876
$titleFull = '';
if( isset($_GET["titleFull"]) ) { $titleFull = mysqli_real_escape_string($link, $_GET['titleFull']); }
// get titelShort -- f1877
$titleShort = '';
if( isset($_GET["titleShort"]) ) { $titleShort = mysqli_real_escape_string($link, $_GET['titleShort']); }
// **********


// prepare sql request IN parameters
$sql = "call sp_update_doctor_by_ID_www_01('";

$sql.= $id . "','";
$sql.= $fname . "','";
$sql.= $mname . "','";
$sql.= $lname . "','";

$sql.= $isActive . "','";
$sql.= $login . "','";
$sql.= $psswd . "','";

$sql.= $address . "','";
$sql.= $city . "','";
$sql.= $state . "','";
$sql.= $zip . "','";

$sql.= $smsNum . "','";
$sql.= $phoneService . "','";
$sql.= $phonePublic . "','";

$sql.= $emailService . "','";
$sql.= $emailPublic . "','";

$sql.= $npi . "','";
$sql.= $titleFull . "','";
$sql.= $titleShort . "',";
$sql.= "@result);";

$result = mysqli_query($link, $sql) or die('[{"Error":"Problem with executing SP:' . mysqli_error($conn) . '"}]');
// step to next result set - MySQL stored procedure specific
$link->next_result();

// Fetch OUT parameters 
if ( !($result = $link->query("SELECT @result AS result;")) )
    { die('[{"Error":"Fetch failed: (' . $link->errno . ') ' . $link->error . '"}]'); };
//$row = $result->fetch_assoc();

// Return result
$arrMain = array();
while ($row = mysqli_fetch_assoc($result)) {
    $arrMain[] = $row;
}    
//$countme = mysqli_num_rows($result);  
// *** *** *** 
 
// parse array into JSON format
$myJSON = json_encode($arrMain);

// print out the JSON result
echo $myJSON;

//free resources
mysqli_free_result($result);
mysqli_close($link);
?>
