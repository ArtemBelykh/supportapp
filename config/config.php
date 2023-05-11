<?php
/* Database credentials. Assuming you are running MySQL
server with default setting (user 'root' with no password) */
define('DB_SERVER', '104.248.191.131');
define('DB_USERNAME', 'php_01');
define('DB_PASSWORD', 'to_DiE_4');
define('DB_NAME', 'ontraport');

/* Attempt to connect to MySQL database */
$link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
// Check connection
if($link === false){
    //die("ERROR: Could not connect. " . mysqli_connect_error());
    die('{"message":"error"}');
}
?>
