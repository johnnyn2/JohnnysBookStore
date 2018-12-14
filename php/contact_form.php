<?php
	if(isset($_POST['tmp_email'])){
	    $email_to = "wkhoae@connect.ust.hk";
		$email_subject = "Customer Contact Message[Johnny's BookStore]";
		
		 // validation expected data exists
		if(!isset($_POST['tmp_firstName']) ||
			!isset($_POST['tmp_lastName']) ||
			!isset($_POST['tmp_email']) ||
			!isset($_POST['tmp_telephone']) ||
			!isset($_POST['tmp_msg'])) {
				died('We are sorry, but there appears to be a problem with the form you submitted.');       
			}
		$first_name = $_POST['tmp_firstName']; // required
		$last_name = $_POST['tmp_lastName']; // required
		$email_from = $_POST['tmp_email']; // required
		$telephone = $_POST['tmp_telephone']; // not required
		$msg = $_POST['tmp_msg']; // required

		function clean_string($string) {
			$bad = array("content-type","bcc:","to:","cc:","href");
			return str_replace($bad,"",$string);
		}
		$email_message .= "First Name: ".clean_string($first_name)."\n";
		$email_message .= "Last Name: ".clean_string($last_name)."\n";
		$email_message .= "Email: ".clean_string($email_from)."\n";
		$email_message .= "Telephone: ".clean_string($telephone)."\n";
		$email_message .= "Message: \n".clean_string($msg)."\n";
		
		// create email headers
		$headers = 'From: '.$email_from."\r\n".
		'Reply-To: '.$email_from."\r\n" .
		'X-Mailer: PHP/' . phpversion();
		mail($email_to, $email_subject, $email_message, $headers);
		
	}
?>