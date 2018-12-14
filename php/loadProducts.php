<?php
	session_start();
	$server = "localhost";
	$username = "u1";
	$pw = "a1";
	$dbname = "hkbookshop";
	
	$database = new mysqli($server, $username, $pw, $dbname);
	if($database->connect_error)
		die("Connection fail");
	$sql = "SELECT * FROM book";
	$result = $database->query($sql);
	$database->close();
	$arr =[];
	$i=0;
	while($row = $result->fetch_assoc()){
		$arr[$i] = $row;
		$i++;
	}
	header('Content-type: application/json');
	echo json_encode($arr);
?>
