<?php

require(dirname(__FILE__).'/../../config/config_op.php');

// use OntraportAPI\Ontraport;
// $clientOP = new Ontraport("2_183266_o5FDesRKh","G6gh62YTh8TXwvV");

$requestParams = array(
  // "objectID" => 0, // Object type ID: 0
  "id"       => 2240,  //contact_id
  "address"  => 'Address_Test_1',  // address1
  "address2" => 'Address_Test_2',  // address2
  "city"     => 'City_Test_1',  // city
  "zip"      => '12321',  // zip
  "state"    => 'MO',  // state_code
);
$response = $clientOP->contact()->update($requestParams);

// $requestParams = array(
//     "id" => 2240    
// );
// $response = $client->custom(10000)->retrieveSingle($requestParams);
// $response = $client->contact()->retrieveCollectionInfo(array());

$response = json_decode($response, true);
//$count = $response["data"]["count"];
/*
$requestParams = array(
    "objectID"  => 10000, // Object type ID: 0
    "id"        => 35,

    "f1858"     => 'fName09',
    "f1859"     => '"BuckEye"',
    "f1860"     => 'lName09'    
);
$response = $clientOP->object()->update($requestParams);
$response = json_decode($response, true);
*/
echo "<pre>";
echo print_r ($response);
echo "<br>";
echo ($response["data"]["attr"]["id"]);
//echo "</pre>";
//echo $count;


?>

