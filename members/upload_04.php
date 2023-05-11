<?php
/*
$image = $request->image;
//$image = $_POST['file'];
$imageInfo = explode(";base64,", $image);
$imgExt = str_replace('data:image/', '', $imageInfo[0]);      
//$image = str_replace(' ', '+', $imageInfo[1]);
//$imageName = "post-".time().".".$imgExt;
*/

if (isset($_POST["data"]) || isset($_POST["name"])) {
  $data = $_POST["data"];
  $fileName = $_POST["name"];
  $fileType = $_POST["type"];

  $replace = "data:" . $fileType . ";base64,";
  $filedata = str_replace($replace, "", $data); // echo $filedata;
  $decodedData = urldecode($filedata); // echo $decodedData;

  // $fp = fopen('uploads/' . $fileName, "w");
  // fwrite($fp, $decodedData);
  // fclose($fp);
}

echo $replace;
// echo $imgExt;

?>