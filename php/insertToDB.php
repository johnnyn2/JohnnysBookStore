<?php

	session_start();
	$server = 'localhost';
	$user = 'u1';
	$pw = 'a1';
	$dbname = 'hkbookshop';
	$database = new mysqli($server, $user, $pw, $dbname);
//	header('Content-type: application/json');
	if($database->connect_error){
		die("Connection fail");
	}
	
	$_SESSION['prefer_date'] = $_POST['preferDate'];
	
	$customer_ID = $_SESSION['customerID'];
	$order_date = date("Y-m-d", time());
	$prefer_date = $_SESSION['prefer_date'];
	$sql_ordering = "INSERT INTO ordering (customerID, orderDate, preferDate) VALUES 
			('".$customer_ID."', '".$order_date."', '".$prefer_date."')";
	$sql = "SELECT * FROM book";
	$result = $database->query($sql);
	$isInsertToOrderDetailsSucceed = true; $isInsertToOrderingSucceed = false;
	if($database->query($sql_ordering)){
		$order_ID = $database->insert_id;
		foreach($_SESSION['products'] as $item){
			$result->data_seek($item['id']);
			$row = $result->fetch_assoc();
			$sql_order_details = "INSERT INTO order_details  (orderID, isbn, orderQuantity) VALUES 
			('".$order_ID."', '".$row['isbn']."', '".$item['desiredQuantity']."')";
				if(!$database->query($sql_order_details)){
					$isInsertToOrderDetailsSucceed = false;
				}
		}
		$isInsertToOrderingSucceed = true;
	}
/*	else{
		echo json_encode("fail");
	}
	if(!$isInsertToOrderDetailsSucceed){
		echo json_encode("fail");
	}*/
	$database->close();
?>