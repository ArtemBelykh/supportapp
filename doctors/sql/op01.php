<?php

require(dirname(__FILE__).'/../../config/config_op.php');

// use OntraportAPI\Ontraport;
// $clientOP = new Ontraport("2_183266_o5FDesRKh","G6gh62YTh8TXwvV");

$requestParams = array(
    //"owner"    => 1,
    "objectID" => 0, //ObjectType::CONTACT, // Object type ID: 0
    "id"       => 814795,             // Contact ID    
    "f1706"    => 357,  // Approval Status
    /*
    357->Approved,
    356->Denied,
    358->Blank Document,
    517->Typos or Misspellings (Please Describe) 
    */
    //"f1707"    => "test me",     // Approval Notes
);
$response = $clientOP->object()->update($requestParams);

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

