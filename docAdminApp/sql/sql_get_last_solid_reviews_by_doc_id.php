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
$id = '';
if( isset($_GET["id"]) ) { $id = mysqli_real_escape_string($link, $_GET['id']); };


$sql = 'CALL sp_get_last_solid_reviews_by_doc_id('.$id.');';
$result = mysqli_query($link, $sql) or die('{"message":"error"}');
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

// $json=file_get_contents("http://west.basketball.nl/db/json/stand.pl?szn_Naam=2014-2015&cmp_ID=373");
//$data =  json_decode($json);
//print_r($arrMain);

// echo "<table>";
// echo "<tr>";
// foreach(array_keys($arrMain[0]) as $head){
//     echo "<td>$head</td>";
// }
// echo "</tr>";

// foreach($arrMain as $row){
//     echo "<tr>";            
//     foreach($row as $col){
//         echo "<td>$col</td>";
//     }
//     echo "</tr>";
// }
// echo "</table>";

?>
