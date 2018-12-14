<?php
	session_start();
	header('Content-type: application/json');
	$arr=[];
	if(isset($_SESSION['isLoggedIn']) && $_SESSION['isLoggedIn']){
		$arr['status'] = "isLoggedIn";
		$arr['customerName'] = $_SESSION['customerName'];
	//	echo json_encode("isLoggedIn");
	}
	else if(isset($_SESSION['loginError']) && $_SESSION['loginError']){
		unset($_SESSION['loginError']);
		$arr['status'] = 'loginError';
	//	echo json_encode("loginError");
	}
	else{
		$arr['status'] = 'notLoggedIn';
	//	echo json_encode("notLoggedIn");
	}
	echo json_encode($arr);
?>