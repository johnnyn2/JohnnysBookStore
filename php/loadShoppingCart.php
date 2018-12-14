<?php 
	session_start();
	$server = "localhost";
	$username = "u1";
	$password = "a1";
	$dbname = "hkbookshop";
	$database = new mysqli($server, $username, $password, $dbname);
	$sql = "SELECT * FROM book";
	$result = $database->query($sql);
	$database->close();
	$arr = [];
	$i=0;
	foreach ($_SESSION['products'] as $item){
		$result->data_seek($item['id']);
		$row = $result->fetch_assoc();
		$arr[$i]['isbn'] = $row['isbn'];
	    $arr[$i]['bname'] = $row['bname'];
		$arr[$i]['price'] = $row['price'];
		$arr[$i]['desiredQuantity'] = $item['desiredQuantity'];
		$i++;
	}
	header('Content-type: application/json');
	echo json_encode($arr);
?>