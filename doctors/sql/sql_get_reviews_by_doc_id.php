<?php
// Initialize the session
session_start();
 
// // Check if the user is logged in, if not then redirect him to login page
// if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
//     header("location: /../login.php");
//    exit;
// }

require(dirname(__FILE__).'/../../config/config.php');

// get doctor id
// $id = '';
// if( isset($_GET["id"]) ) { $id = mysqli_real_escape_string($link, $_GET['id']); };

$doctor_id = $_SESSION["id"];

// if ( $doctor_id==3 ){
//   // make Dr.Welch specific request
//   $sql = 'CALL sp_get_special_reviews_by_doc_id('.$doctor_id.', "CA", "2020-09-21 00:00:00");';
// } else if ( $doctor_id==2 ) {
// } else {
//   // go on with the general request
//   $sql = 'CALL sp_get_reviews_by_doc_id('.$doctor_id.');';
// }

switch ($doctor_id) {
  case '2':  // Dominguez
    // make Dr.Dominguez specific request
    $sql = 'CALL sp_get_special_reviews_by_doc_id('.$doctor_id.', "FL", "2020-10-12 12:00:00");';
    break;
  case '3': // Welch    
    $sql = 'CALL sp_get_special_reviews_by_doc_id('.$doctor_id.', "CA", "2020-09-21 00:00:00");';
    break; 
  case '5': // Martin del Campo      
    $sql = 'CALL sp_get_special_reviews_by_doc_id('.$doctor_id.', "CA", "2020-10-19 00:00:00");';
    break;     
  case '8': // Estevez
    $sql = 'CALL sp_get_special_reviews_by_doc_id('.$doctor_id.', "CA", "2020-11-08 00:00:00");';
    break;     
  case '10': // Sanchez
    $sql = 'CALL sp_get_special_reviews_by_doc_id('.$doctor_id.', "CA", "2020-11-08 00:00:00");';
    break;             
  case '11': // Zal-Herwitz
    $sql = 'CALL sp_get_special_reviews_by_doc_id('.$doctor_id.', "CA", "2020-11-10 00:00:00");';
    break;                 
  case '13': // Jones    
    $sql = 'CALL sp_get_special_reviews_by_doc_id('.$doctor_id.', "CA", "2020-11-08 00:00:00");';
    break;         
  case '14': // Sutton    
    $sql = 'CALL sp_get_special_reviews_by_doc_id('.$doctor_id.', "CA", "2020-11-15 00:00:00");';
    break;             
  case '15': // Pershwitz    
    $sql = 'CALL sp_get_special_reviews_by_doc_id('.$doctor_id.', "CA", "2020-11-12 00:00:00");';
    break;         
  case '16': // Martinez
    $sql = 'CALL sp_get_special_reviews_by_doc_id('.$doctor_id.', "CA", "2020-11-18 00:00:00");';
    break;             
  case '17': // Rawlinson    
    $sql = 'CALL sp_get_special_reviews_by_doc_id('.$doctor_id.', "CA", "2020-11-12 00:00:00");';
    break;
  case '18': // Ogburia
    $sql = 'CALL sp_get_special_reviews_by_doc_id('.$doctor_id.', "CA", "2020-11-18 00:00:00");';
    break;             
  case '20': // Tedeschi
    $sql = 'CALL sp_get_special_reviews_by_doc_id('.$doctor_id.', "CA", "2020-11-18 00:00:00");';
    break;                     
  case '23': // Daniel
    $sql = 'CALL sp_get_special_reviews_by_doc_id('.$doctor_id.', "CA", "2020-11-08 00:00:00");';
    break;             
  case '25': // Purdy
    $sql = 'CALL sp_get_special_reviews_by_doc_id('.$doctor_id.', "CA", "2020-11-15 00:00:00");';
    break;                 
  default:
    $sql = 'CALL sp_get_reviews_by_doc_id('.$doctor_id.');';
}

$result = mysqli_query($link, $sql) or die('[{"Error":"Problem with executing query:' . mysqli_error($conn) . '"}]');
$arrMain = array();
while ($row = mysqli_fetch_assoc($result)) {
    $arrMain[] = $row;
}    
//$countme = mysqli_num_rows($result);  
// *** *** *** 

//echo $sql;
$myJSON = json_encode($arrMain);

echo $myJSON;

//free resources
mysqli_free_result($result);
mysqli_close($link);
?>
