<?php
	session_start();
	$_SESSION['products'] = $_POST['tmp_myProducts'];
	$_SESSION['total'] = $_POST['tmp_total'];
?>
