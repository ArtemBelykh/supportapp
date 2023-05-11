<?php
require(dirname(__FILE__).'/../config/config.php');

$fname = $_POST['name'];
$ftype = $_POST['type'];

// // Decode base64 data
// list($type, $data) = explode(';', $_POST['file']);
// list(, $data) = explode(',', $data);
// $file_data = base64_decode($data);

$data = explode(";base64,", $_POST['file']);
$fext = str_replace('data:image/', '', $data[0]);
$fdata = base64_decode( $data[1] );

// // Get file mime type
$finfo = finfo_open(FILEINFO_MIME_TYPE);
// // $file_mime_type = finfo_buffer($finfo, $file_data, FILEINFO_MIME_TYPE);
$file_mime_type = finfo_buffer($finfo, $fdata);

//echo 'fname -> '.$fname.' fext-> '.$fext;
// echo 'fname -> '.$fname.' file_mime_type-> '.$file_mime_type;
// exit; 

// File extension from mime type
if($file_mime_type == 'image/jpeg' || $file_mime_type == 'image/jpg')
	$file_type = 'jpeg';
else if($file_mime_type == 'image/png')
	$file_type = 'png';
else if($file_mime_type == 'image/gif')
	$file_type = 'gif';
else 
	$file_type = 'other';

// Validate type of file
if(in_array($file_type, [ 'jpeg', 'png', 'gif' ])) {
	// Set a unique name to the file and save
  // $file_name = uniqid() . '.' . $file_type;  
  ////file_put_contents($file_name, $file_data);
  ////$imgData = addslashes(file_get_contents($fdata));
  $imgData = addslashes($fdata);

  // $sql = "CALL sp_insert_pet_image_01( 2368, '{$file_name}', '{$file_type}', '{$imgData}', @out );"; //  SELECT @out AS result;
  $sql = "CALL sp_insert_pet_image_01( 2368, '{$file_type}', '{$imgData}', @out );"; //  SELECT @out AS result;
  ////$sql = "INSERT INTO pet_images(pet_id, image_type ,image_data)";
  ////VALUES('{$imageProperties['mime']}', '{$imgData}', '{$_SESSION['id']}')";
  //// $sql .= "VALUES('2368','{$imageProperties['mime']}', '{$imgData}')";
  ////$sql .= "VALUES('2368','{$file_mime_type}', '{$fdata}')";
  $current_id = mysqli_query($link, $sql) or die("<b>Error:</b> Problem on Image Insert<br/>" . mysqli_error($link));    
  mysqli_close($link);
  // if(isset($current_id)) {
  //     header("Location: gallery.php");
  // };
  echo $current_id;
}
else {
	echo 'Error : Only JPEG, PNG & GIF allowed';
}

?>