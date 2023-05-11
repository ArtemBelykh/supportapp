<?php
require(dirname(__FILE__).'/../../config/config.php');

$fname = $_POST['name'];
$ftype = $_POST['type'];
$pet_id = $_POST['pet_id'];
//$pet_id = 2368;

$data = explode(";base64,", $_POST['file']);
$fext = str_replace('data:image/', '', $data[0]);
$fdata = base64_decode( $data[1] );

// Get file mime type
$finfo = finfo_open(FILEINFO_MIME_TYPE);
$file_mime_type = finfo_buffer($finfo, $fdata);

// File extension from mime type
if( $file_mime_type == 'image/jpeg' || $file_mime_type == 'image/jpg' )
	$file_type = 'jpeg';
else if( $file_mime_type == 'image/png' )
	$file_type = 'png';
else if( $file_mime_type == 'image/gif' )
	$file_type = 'gif';
else 
	$file_type = 'other';

// Validate type of file
if( in_array( $file_type, [ 'jpeg', 'png', 'gif' ] ) ) {
  $imgData = addslashes($fdata);
  $sql = "CALL sp_insert_pet_image_01( '{$pet_id}', '{$file_type}', '{$imgData}', @out );"; //  SELECT @out AS result;
  $current_id = mysqli_query($link, $sql) or die("<b>Error:</b> Problem on Image Insert<br/>" . mysqli_error($link));    
  mysqli_close($link);
  echo $current_id;
}
else {
	echo 'Wrong file type: JPEG, PNG or GIF are allowed';
}

?>