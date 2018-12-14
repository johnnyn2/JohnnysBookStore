<?php
	session_start();
	header('Content-type: application/json');
	$arr = [];
	$arr['submitRegistration'] = false;
	if(isset($_SESSION['accountExisted']) && $_SESSION['accountExisted']){
		unset($_SESSION['accountExisted']);
		$arr['status'] = "accountExisted";
	}
	else if(isset($_SESSION['emailUsed']) && $_SESSION['emailUsed']){
		unset($_SESSION['emailUsed']);
		$arr['status'] = "emailUsed";
	}
	else if(isset($_SESSION['phoneUsed']) && $_SESSION['phoneUsed']){
		unset($_SESSION['phoneUsed']);
		$arr['status'] = "phoneUsed";
	}
	else if(isset($_SESSION['success']) && $_SESSION['success']){
		unset($_SESSION['success']);
		$arr['status'] = "success";
	}
	else if(isset($_SESSION['fail']) && $_SESSION['fail']){
		unset($_SESSION['fail']);
		$arr['status'] = "fail";
	}
	if(isset($_SESSION['reg_account'])){
		$arr['submitRegistration'] = true;
		$arr['name'] = $_SESSION['reg_customerName'];
		$arr['age'] = $_SESSION['reg_age'];
		$arr['phone'] = $_SESSION['reg_phone'];
		$arr['email'] = $_SESSION['reg_email'];
		$arr['account'] = $_SESSION['reg_account'];
		$arr['password'] = $_SESSION['reg_password'];
		unset($_SESSION['reg_customerName']);
		unset($_SESSION['reg_age']);
		unset($_SESSION['reg_phone']);
		unset($_SESSION['reg_email']);
		unset($_SESSION['reg_account']);
		unset($_SESSION['reg_password']);
	}
	echo json_encode($arr);
?>