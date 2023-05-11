<?php
// Initialize the session
session_start();
 
require(dirname(__FILE__).'/../../config/config.php');

// $pet_id = '';
// if( isset($_GET["pet_id"]) ) { 
//     $pet_id = mysqli_real_escape_string($link, $_GET['pet_id']); 
// } else {
//     // die();
//     mysqli_close($link);
//     exit;
// };


/*
$sql = "SELECT image_type, image_data FROM v_pet_images_01 ";
// $sql .= "WHERE id=" . $_GET['id'] . " AND UserID=" . $_SESSION['id'];
$sql .= "WHERE pet_id=" . $_GET['pet_id']; //$pet_id ;
$result = mysqli_query($link, $sql) or die("<b>Error:</b> Problem on Retrieving Image BLOB<br/>" . mysqli_error($conn));
$row = mysqli_fetch_array($result);

header("Content-type: " . $row["image_type"]);
echo $row["image_data"];

mysqli_close($link);
*/
$objSO0_i0 = (object) array(
  'name' => 'Pet Collar Tag',
  'pet_id' => '8446',
  'qnty' => '1'
);

$objSO0_i1 = (object) array(
  'name' => 'ESA Certificate',
  'pet_id' => '8446',
  'qnty' => '1'
);

$objSO0 = (object) array(
  'contact_id' => '2240',
  'order_id' => '3928',
  'dt_created' => '2019-09-01 13:01:01',
  'amount' => '1',  
  'items_list' => array (
     'item0' => $objSO0_i0,
     'item1' => $objSO0_i1
  ),
  'delivery_status' => 'delivered',
  'track_number' => '9574198164321654',
  'track_carrier' => 'USPS',
  'dt_delivered' => '20199-09-06 19:31:21' );

  $objSO1_i0 = (object) array(
    'name' => 'ESA Letter',
    'pet_id' => '2146',
    'qnty' => '1'
  );
  
  $objSO1_i1 = (object) array(
    'name' => 'Pet ESA Card',
    'pet_id' => '2146',
    'qnty' => '2'
  );
  
  $objSO1 = (object) array(
    'contact_id' => '2240',
    'order_id' => '19445',
    'dt_created' => '2020-05-18 06:31:36',
    'amount' => '1',  
    'items_list' => array (
       'item0' => $objSO1_i0,
       'item1' => $objSO1_i1
    ),
    'delivery_status' => 'delivered',
    'track_number' => '9574198164321654',
    'track_carrier' => 'USPS',
    'dt_delivered' => '2020-05-22 21:23:03' );

$myObj = (object) array(
  $objSO0,
  $objSO1,
);

$myJSON = json_encode( $myObj );

echo $myJSON;
?>