<?php
session_start();
$server = "localhost";
$username = "u1";
$password = "a1";
$dbname = "hkbookshop";
$database = new mysqli($server, $username, $password, $dbname);
if($database->connect_error)
	die("Connection fail!");
$sql = "SELECT * FROM customer";
$result = $database->query($sql);
$isValid = true;
if(isset($_POST["reg_account"]) && isset($_POST["reg_password"]) && isset($_POST["reg_email"]) && isset($_POST["reg_phone"]) && isset($_POST["reg_age"])
	&& isset($_POST["reg_customerName"])){
	$_SESSION['reg_customerName'] = $_POST['reg_customerName'];
	$_SESSION['reg_age'] = $_POST['reg_age'];
	$_SESSION['reg_phone'] = $_POST['reg_phone'];
	$_SESSION['reg_email'] = $_POST['reg_email'];
	$_SESSION['reg_account'] = $_POST['reg_account'];
	$_SESSION['reg_password'] = $_POST['reg_password'];
	if($result->num_rows>0)
		while($row = $result->fetch_assoc()){
			if($row["account"]==$_POST["reg_account"]){
				$_SESSION["accountExisted"] = true;
				$isValid = false;
				break;
			}
			else if($row["email"]==$_POST["reg_email"]){
				$_SESSION["emailUsed"] = true;
				$isValid = false;
				break;
			}
			else if($row["phone"]==$_POST["reg_phone"]){
				$_SESSION["phoneUsed"] = true;
				$isValid = false;
				break;
			}
		}
		
	if($isValid){
		$sql = "INSERT INTO customer (customerName, age, phone, email, account, password)
		VALUES ('".$_POST["reg_customerName"]."', ".$_POST["reg_age"].", '".$_POST["reg_phone"]."', '"
		 .$_POST["reg_email"]."', '".$_POST["reg_account"]."', '".$_POST["reg_password"]."')"; 

		 if($database->query($sql)==true){
			$_SESSION["success"] = true;
		}
		else{
			$_SESSION["fail"] = true;
		}
	}
}
	$database->close();  
 
?>