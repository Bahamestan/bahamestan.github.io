<?php

include_once("functions.php");
$api = 'YOUR-API-KEY';
$token = $_GET['token'];
$result = json_decode(verify($api,$token));
if(isset($result->status)){
	if($result->status == 1){
		echo "<h1>تراکنش با موفقیت انجام شد</h1>";
	} else {
		echo "<h1>تراکنش با خطا مواجه شد</h1>";
	}
} else {
	if($_GET['status'] == 0){
		echo "<h1>تراکنش با خطا مواجه شد</h1>";
	}
}