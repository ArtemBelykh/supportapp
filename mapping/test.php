<?php

  // $apiKey = '91cfc462cf5dd8f75ec5cae21d5167a5'; 
  
  require(dirname(__FILE__).'/../config/config_jotform.php');        
  // echo $api_key;

  // get form id
  //$formID = 82258553329160;
   $formID = isset($_GET["formID"]) ? $_GET['formID'] : 82258553329160;

  //get submission fields
  $curl = curl_init();
  curl_setopt_array($curl, array(
    CURLOPT_RETURNTRANSFER => 1,
    CURLOPT_USERAGENT => 'JOTFORM_PHP_WRAPPER',
    // CURLOPT_URL => "http://api.jotform.com/submission/" . $submission_id . "?apiKey=" . $apiKey
    //CURLOPT_URL => "http://api.jotform.com/user/forms?apiKey=" . $api_key
    CURLOPT_URL => "http://api.jotform.com/form/" . $formID . "/questions?apiKey=" . $api_key
  ));
  $result = curl_exec($curl);
    
  $data = json_decode($result);
  $arrMain = $data->content;  
 
  // print_r ($arrMain); exit;
  // $myObjArr = [];
  // $i = 0;

  // foreach($arrMain as $row){    
    
  //   $myObj = new stdClass();
  //   $myObj->id    = $row->id;
  //   $myObj->title = $row->title;
    
  //   array_push( $myObjArr, $myObj);
    
  // }
  // $myJSON = json_encode($myObjArr);

  // echo $myJSON;

  echo "<table>";
  // echo "<tr>";
  // foreach(array_keys($arrMain[0]) as $head){
  //     echo "<td>$head</td>";
  // }
  // echo "</tr>";
  $i = 0; 
  foreach($arrMain as $key=>$val){
      // echo "<tr>";            
      // echo "<td>".$key."</td>";

      $mytext = '';
      $mytext = strip_tags($val->text);

      if( array_key_exists( 'sublabels', $val ) ){
        // foreach($val->sublabels as $field=>$details){
        foreach($val->sublabels as $field=>$details){
          echo "<tr>";            
          echo "<td>".$i."</td>";
          echo "<td>".$key."_".$field."</td>";
          echo "<td>".$mytext." >> ".$details."</td>";
          echo "</tr>";
          $i++;
        }
      } else {
        echo "<tr>";            
        echo "<td>".$i."</td>";
        echo "<td>".$key."</td>";
        echo "<td>".$mytext."</td>";
        echo "</tr>";
        $i++;
      }
      //$myObj = new stdClass();
      
      
      
      //echo "<td>".$row->title."</td>";
      // foreach($row as $col){
      //     echo "<td>$col</td>";
      // }
      
  }
  echo "</table>";
?>
