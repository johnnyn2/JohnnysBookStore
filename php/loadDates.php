<?php
	session_start();
	$min_date = date("Y-m-d", strtotime("+1 day",time()));	
	$max_date = date("Y-m-d", strtotime("+30 days",time()));
	$order_date = date("Y-m-d", time());
	$arr = [];
	$arr['min_date'] = $min_date;
	$arr['max_date'] = $max_date;
	header('Content-type: application/json');
	echo json_encode($arr);
?>