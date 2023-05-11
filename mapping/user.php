<?php

    // $apiKey = '91cfc462cf5dd8f75ec5cae21d5167a5'; 
    require( dirname(__FILE__).'../../config/config_jotform.php' );
    //get submission fields
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_USERAGENT => 'JOTFORM_PHP_WRAPPER',
        // CURLOPT_URL => "http://api.jotform.com/submission/" . $submission_id . "?apiKey=" . $apiKey
        CURLOPT_URL => "http://api.jotform.com/user?apiKey=" . $apiKey
    ));
    $result = curl_exec($curl);
    echo $result;
    //  $data = json_decode($result);
    // echo $data;  
    
    // $forms = $jotformAPI->getForms();
    
    // foreach ($forms as $form) {
    //     print $form["title"];
    // }

?>