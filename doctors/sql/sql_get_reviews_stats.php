<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}

if(!isset($_SESSION["id"])){
  header("location: login.php");
  exit;
}

require(dirname(__FILE__).'/../../config/config.php');

$doctor_id = $_SESSION["id"]; //3 
$tz_offset = ( isset($_GET['tz_offset']) ) ? mysqli_real_escape_string($link, $_GET['tz_offset']) : 0 ;

$sql = "CALL sp_get_reviews_statistics_01( ";
$sql.= $doctor_id . ", ";
$sql.= $tz_offset . ", ";
$sql.= "@result)";

//echo $sql; exit;

$result =  mysqli_query($link, $sql) or die("{'message':'error'}"); 
// $result = mysqli_query($link, $sql) or die('[{"Error":"Problem with executing SP:' . mysqli_error($conn) . '"}]');
// step to next result set - MySQL stored procedure specific
$link->next_result();

// Fetch OUT parameters 
if ( !($result = $link->query("SELECT @result AS result;")) )
    { // die('[{"Error":"Fetch failed: (' . $link->errno . ') ' . $link->error . '"}]'); 
      die("{'message':'error'}");
    };
//$row = $result->fetch_assoc();
// Return result
$arrMain = array();
while ($row = mysqli_fetch_assoc($result)) {
    $arrMain[] = $row;
}    
//$countme = mysqli_num_rows($result);  
// *** *** *** 

// echo print_r( $arrMain[0]["result"] );
echo $arrMain[0]["result"] ;


// // parse array into JSON format
// $myJSON = json_encode($arrMain[0]["result"]);

// // print out the JSON result
// echo stripslashes( $myJSON );

//free resources
mysqli_free_result($result);
mysqli_close($link);
?>