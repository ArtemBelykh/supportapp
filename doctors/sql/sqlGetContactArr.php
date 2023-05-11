<?php
// Initialize the session
session_start();

// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}

require(dirname(__FILE__).'/../../config/config.php');

if(isset($_GET['clientID'])) {
    $sql = "SELECT * FROM v_ontraport_01 ";
    $sql .= "WHERE id=" . $_GET['clientID'];
    $result = mysqli_query($link, $sql) or die("<b>Error:</b> Problem on Retrieving Image BLOB<br/>" . mysqli_error($conn));
    $rows = mysqli_fetch_array($result);

    // remove weird characters from DB
    array_walk_recursive($rows, function(&$value, $key) {
        if (is_string($value)) {
            $value = iconv('latin1', 'utf-8', $value);
        }
    });

    header("Content-type:application/json"); 
    echo print_r($rows);
    //echo json_encode($rows);
}
mysqli_close($link);
?>