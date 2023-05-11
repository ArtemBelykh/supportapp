<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
  //header("location: /../login.php");
  die('{"message":"error0"}');  
}

require(dirname(__FILE__).'/../../config/config_klaviyo.php');

$data = json_decode( file_get_contents('php://input') );
// var_dump( $data->operation );

$email = $data->email ; //  = $_POST['subject'];
$fileESA = $data->fileESA; //  = $_POST['note_body'];

// https://drive.google.com/file/d/1NC1WyvisZXZMHM4h85BUx9-xne2U_7ej/preview?usp=drivesdk
$urlESA = 'https://drive.google.com/file/d/'.$fileESA.'/view';

$json_data = json_decode('{
    "token" : "'.$api_public.'",
    "event" : "ESA Documents to resend",
    "customer_properties" : {
      "$email" : "'.$email.'"
    },
    "properties" : {
      "esa_file" : "'.$fileESA.'",
      "esa_url" : "'.$urlESA.'"
    }
  }');

//echo '<pre>'.json_encode( $json_data ).'</pre>'; exit;
// var_dump(json_last_error_msg());
// var_dump( json_encode( $data ));
// var_dump( json_encode( $json_data ));
// exit;

$url = "https://a.klaviyo.com/api/track?data=";
$url.= base64_encode ( json_encode( $json_data ) );

//echo $url; exit;
// var_dump(json_last_error_msg());
// var_dump( json_encode( $data ));
// // echo json_encode( $data );
// // var_dump(json_decode($data));

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => $url,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  //CURLOPT_POST            => 1,            // i am sending post data
  //CURLOPT_POSTFIELDS     => $curl_data    // this are my post vars
));

$response = curl_exec($curl);
// echo "<pre>$response</pre>";
// echo "<br><br>";
// var_dump($response);

$myObj = new stdClass();
$myObj->result = $response;
// $myObj->result = "0";

$myJSON = json_encode($myObj);

echo $myJSON;
curl_close( $curl );

// $json = json_decode($response, true);
// echo $json[0]['id'];  
// print_r($json);

// Array ( [0] => Array ( [email] => alex.code.keen@gmail.com [id] => PSYSgw [created] => 2019-11-07T22:44:19Z ) )

// echo 'response -> ';  
// echo $response;


//[list_name] => Ontraport all contacts [list_id] => NTw8g3

?>