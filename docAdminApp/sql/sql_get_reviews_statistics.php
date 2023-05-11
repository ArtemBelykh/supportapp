<?php
// Initialize the session
session_start();
 
// // Check if the user is logged in, if not then redirect him to login page
// if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
//     header("location: /../login.php");
//    exit;
// }

require(dirname(__FILE__).'/../../config/config.php');

// get customer id
// $id = ( isset($_GET["id"]) ) ? mysqli_real_escape_string($link, $_GET['id']) : '';

$tz_offset = ( isset($_GET['tz_offset']) ) ? mysqli_real_escape_string($link, $_GET['tz_offset']) : 240 ;
$arrMain = [];
$myObjArr = [];

$sql_1 = "SELECT * FROM v_active_doctors"; // WHERE id IN (2,3,5,8,10,11,13,14,15,16,17,18,20,23,25);";
$result_1 = mysqli_query($link, $sql_1) or die("{'message':'error'}"); 
$arrDoctors = array();
while ($row = mysqli_fetch_assoc($result_1)) {
    $arrDoctors[] = $row;  
}
//print_r($arrDoctors[0]);exit;

foreach($arrDoctors as $doctor){    
  //print_r($doctor); break;

  $sql = "CALL sp_get_reviews_statistics_01( ";
  $sql.= $doctor['id'] . ", ";
  $sql.= $tz_offset . ", ";
  $sql.= "@result)";

  //echo $sql; break;

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

  while ($row = mysqli_fetch_assoc($result)) {

    $myObj = new stdClass();
    $myObj->id    = $doctor['id'];
    //$myObj->fname = addslashes($doctor->title);
    $myObj->fname = $doctor['fname'];
    $myObj->lname = $doctor['lname'];

    //$temp = json_decode(  $row["result"], true );

    // $myObj->data = json_encode( $row,   JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK );
    $myObj->data =  json_decode(  $row["result"], true );
    //$myObj->data = $row["result"] ,  JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK );
    array_push( $myObjArr, $myObj );
    //$arrMain[] = $row;
    // array_push( $doctor, $row );
    // print_r( $doctor['0']['result'] );
    //echo $doctor['0']['result'] ;
    // $myJSON = json_encode( $doctor['0']['result'] );
    
    //print_r( $myObj->data );    
    // var_dump(json_decode($myObj->data));

    //print_r( $myObj->data );
  }    
}
//$myJSON = json_encode( $myObjArr );
// echo $myObjArr[0]["data"];
//exit;
//$countme = mysqli_num_rows($result);  
// *** *** *** 

//echo $sql;
$myJSON = json_encode($myObjArr);
echo $myJSON;

//free resources
mysqli_free_result($result);
mysqli_close($link);

// $json=file_get_contents("http://west.basketball.nl/db/json/stand.pl?szn_Naam=2014-2015&cmp_ID=373");
//$data =  json_decode($json);
//print_r($arrMain);


?>
