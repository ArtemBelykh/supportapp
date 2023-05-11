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

// $sql_1 = "SELECT * FROM v_doctors_www_01 WHERE id IN (2,3,5,8,10,11,13,14,15,16,17,18,20,23,25);";
$sql = "CALL sp_get_last_solid_reviews_by_doc_id( 3 );";
$result = mysqli_query($link, $sql) or die("{'message':'error'}"); 
$arrDoctors = array();
while ($row = mysqli_fetch_assoc($result)) {
    $arrDoctors[] = $row;  
}
$countme = mysqli_num_rows($result);  
//print_r($arrDoctors[0]);exit;

//$myJSON = json_encode( $myObjArr );
// echo $myObjArr[0]["data"];
//exit;
//$countme = mysqli_num_rows($result);  
// *** *** *** 

//echo $sql;
// $myJSON = json_encode($arrMain);
// echo $myJSON;

//free resources
mysqli_free_result($result);
mysqli_close($link);

// $json=file_get_contents("http://west.basketball.nl/db/json/stand.pl?szn_Naam=2014-2015&cmp_ID=373");
//$data =  json_decode($json);
//print_r($arrMain);

echo "<b>List of incomplete Approval Reviews</b><br>" ;

echo "<p> Total entries found -> " ;
echo $countme;
echo "</p><br>";

echo "<style> table, th, td {border: 1px solid grey;} th, td { padding: 2px;} </style>";

echo "<table>";

echo "<tr>";
foreach(array_keys($arrDoctors[0]) as $heads){    
  echo "<th>$heads</th>";  
}
echo "</tr>";

foreach( $arrDoctors as $row ){
  echo "<tr>";            
  foreach($row as $col){
      echo "<td>$col</td>";
  }
  echo "</tr>";
}

echo "</table>";

?>
