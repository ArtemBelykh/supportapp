<?php

  // $apiKey = '91cfc462cf5dd8f75ec5cae21d5167a5'; 
  
  require(dirname(__FILE__).'/../config/config_jotform.php');        
  // echo $api_key;


  //get submission fields
  $curl = curl_init();
  curl_setopt_array($curl, array(
    CURLOPT_RETURNTRANSFER => 1,
    CURLOPT_USERAGENT => 'JOTFORM_PHP_WRAPPER',
    // CURLOPT_URL => "http://api.jotform.com/submission/" . $submission_id . "?apiKey=" . $apiKey
    //CURLOPT_URL => "http://api.jotform.com/user/forms?apiKey=" . $api_key
    CURLOPT_URL => "http://api.jotform.com/user/forms?apiKey=" . $api_key . "&limit=500&orderby=id"
  ));
  $result = curl_exec($curl);
  // echo $result;

  $data = json_decode($result);
  $arrMain = $data->content;  

  // print_r ($arrMain);
  $myObjArr = [];

  foreach($arrMain as $row){    
    
    $myObj = new stdClass();
    $myObj->id    = $row->id;
    $myObj->title = addslashes($row->title);
    
    array_push( $myObjArr, $myObj );
  }
  $myJSON = json_encode( $myObjArr );

  echo $myJSON;

  // echo "<table>";
  // echo "<tr>";
  // foreach(array_keys($arrMain[0]) as $head){
  //     echo "<td>$head</td>";
  // }
  // echo "</tr>";
  
  // foreach($arrMain as $row){
  //     echo "<tr>";            
  //     echo "<td>".$row->id."</td>";
  //     echo "<td>".$row->title."</td>";
  //     // foreach($row as $col){
  //     //     echo "<td>$col</td>";
  //     // }
  //     echo "</tr>";
  // }
  // echo "</table>";

?>
