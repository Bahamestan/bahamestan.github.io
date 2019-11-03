<?php

include_once("functions.php");
$api = '7546a21626088bcf583cdee67b358ca2';
$amount = $_POST["amount"];
$mobile = $_POST["phone"];
$factorNumber = "شماره فاکتور";
$description = "توضیحات";
$redirect = 'http://bahamestan.ir/verify.php';
$result = send($api, $amount, $redirect, $mobile, $factorNumber, $description);
$result = json_decode($result);
if($result->status) {
	$go = "https://pay.ir/pg/$result->token";
	header("Location: $go");
} else {
	echo $result->errorMessage;
}