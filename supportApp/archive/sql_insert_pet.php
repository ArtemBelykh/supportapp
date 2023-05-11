<?php
// Initialize the session
session_start();
 
// // Check if the user is logged in, if not then redirect him to login page
// if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
//     header("location: /../login.php");
//    exit;
// }

require(dirname(__FILE__).'/../../config/config.php');

$arrVar = array(
  $_POST['contact_id'],
  $_POST['type'],    
  $_POST['title'],
  $_POST['breed'],
  $_POST['weight'],
  $_POST['op_order']
);

// !!!!!
// $id = 2240;
// !!!!!

$res = -1;
$sql = "CALL sp_insert_pet_op(";
// $sql.= implode("','", $arrVar);
foreach( $arrVar as $var ){
  if( $var == null ){
    $sql.= " null,";
  } else {
    $sql.= " '$var',";
  }
}
$sql = substr( $sql, 0, -1 ); // trim last comma
$sql.= ", @res);";

//echo "<pre>"; echo $sql; echo "</pre>"; //exit;

$result = mysqli_query($link, $sql) or die( $res );
// step to next result set - to MySQL stored procedure OUT results
$link->next_result();
// Fetch OUT parameters 
if ( !($result = $link->query( "SELECT @res;")) ) { die( $res ); };
$row = mysqli_fetch_assoc($result);
// get sql data

$res = ( $row['@res'] > 0 ) ? 1 : $row['@res'] ; 

echo $res;

//free resources
mysqli_free_result($result);
mysqli_close($link);
?>
