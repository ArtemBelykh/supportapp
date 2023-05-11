<?php
// Initialize the session
session_start();
 
// // Check if the user is logged in, if not then redirect to login page
// if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
//     header("location: /../login.php");
//     exit;
// }

require(dirname(__FILE__).'/../../config/config.php');

// **********
// get incoming parameters

// get fname -- f1858
$fname = isset($_GET["fname"])? mysqli_real_escape_string($link, $_GET['fname']) : null ;
// get lname -- f1860
$lname = isset($_GET["lname"])? mysqli_real_escape_string($link, $_GET['lname']) : null ;

// get is_active
$is_active = isset($_GET["is_active"]) ? mysqli_real_escape_string($link, $_GET['is_active']) : 1;
// get bday
$bday = isset($_GET["bday"]) ? mysqli_real_escape_string($link, $_GET['bday']) : null;

// get login
$login = isset($_GET["login"]) ? mysqli_real_escape_string($link, $_GET['login']) : null ;
// get psswd
$psswd = '';
if( isset($_GET["psswd"]) ) { 
    $password = mysqli_real_escape_string($link, $_GET['psswd']); 
    $psswd = password_hash($password, PASSWORD_DEFAULT); // Creates a password hash
};

// get phone
$phone = isset($_GET["phone"]) ? mysqli_real_escape_string( $link, $_GET['phone']) : null ;
// get email
$email = isset($_GET["email"]) ? mysqli_real_escape_string($link, $_GET['email']) : null ;

// get id_manager
$id_manager = isset($_GET["id_manager"]) ? mysqli_real_escape_string($link, $_GET['id_manager']) : null;
// get id_department
$id_department = isset($_GET["id_department"]) ? mysqli_real_escape_string($link, $_GET['id_department']) : null;

$arrVar = array(
  $fname,
  $lname,
  $login,
  $psswd,
  $is_active,
  $bday,
  $phone,
  $email,
  $id_manager,
  $id_department
);

// prepare sql request IN parameters
$sql = "call sp_insert_employee(";

foreach( $arrVar as $var ){
  if( $var == null ){
    $sql.= " null,";
  } else {
    $sql.= " '$var',";
  }
}
$sql = substr( $sql, 0, -1 ); // trim last comma
$sql.= ", @result);";

//echo $sql; exit;
$result = mysqli_query($link, $sql) or  die('[{"message":"error"}]'); //die("<b>Error:</b><br/>" . mysqli_error($link)); // die('[{"message":"error"}]');
// step to next result set - MySQL stored procedure specific
$link->next_result();

// Fetch OUT parameters 
if ( !($result = $link->query("SELECT @result AS result;")) )
    { die('[{"message":"error"}]'); };
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