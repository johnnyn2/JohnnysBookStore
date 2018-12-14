<?php session_start();
	$server = "localhost";
	$username = "u1";
	$password = "a1";
	$dbname = "hkbookshop";
	header('Content-type: application/json');
	if(isset($_POST['logout'])){
		foreach($_SESSION as $key=>$value){
			unset($_SESSION[$key]);
		}
	}
if(!isset($_SESSION['isLoggedIn'])){
	if(isset($_POST['tmp_account']) && isset($_POST['tmp_password'])){
  
		$database = new mysqli($server, $username, $password, $dbname);
  
		if($database->connect_error)
			die("Fail to connect!".$database->connect_error);
  
		$ac = $_POST['tmp_account'];
		$pw = $_POST['tmp_password'];
		$sql = "SELECT * FROM customer WHERE account = '".$ac."' AND password = '".$pw."'";
		$result = $database->query($sql);
		if($result->num_rows>0){
			$_SESSION['isLoggedIn'] = true;
			while($row = $result->fetch_assoc()){
				$_SESSION['customerID'] = $row['customerID'];
				$_SESSION['customerName'] = $row['customerName'];
			}
			echo json_encode("isLoggedIn");
		}
		else{
			$_SESSION['loginError'] = true;
			echo json_encode("notLoggedIn");
		}
		$database->close();
	}
}
?>