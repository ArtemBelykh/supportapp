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
$id = isset($_GET["id"])? mysqli_real_escape_string($link, $_GET['id']) : null ;

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

// get id_department
$id_department = isset($_GET["id_department"]) ? mysqli_real_escape_string($link, $_GET['id_department']) : null;
// get id_manager
$id_manager = isset($_GET["id_manager"]) ? mysqli_real_escape_string($link, $_GET['id_manager']) : null;

$arrVar = array(
  $id,
  $fname,
  $lname,
  $login,
  $psswd,
  $is_active,
  $bday,
  $phone,
  $email,
  $id_department,
  $id_manager
);


// prepare sql request IN parameters
$sql = "call sp_update_employee_01(";

foreach( $arrVar as $var ){
  if( $var == null ){
    $sql.= " null,";
  } else {
    $sql.= " '$var',";
  }
}
$sql = substr( $sql, 0, -1 ); // trim last comma
$sql.= ");";

mysqli_query($link, $sql) or die("<b>Error:</b><br/>" . mysqli_error($link)); //die('[{"message":"error"}]');

$myObj->message = "success";
$myJSON = json_encode($myObj);
echo $myJSON;

//free resources
//mysqli_free_result($result);
mysqli_close($link);
?>