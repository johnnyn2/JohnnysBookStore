var account;
var password;
$(document).ready(function(){
	$.ajax({
		url: "php/checkLogin.php",
		success: function(data){
					if(data.status == "isLoggedIn"){
						$('#login_form').css("display","none");
						$('#link-register').css("display","none");
						$('#greet-user').css("display","block");
						$('#username').text(data.customerName);
					}
					else if(data.status == "loginError"){
						$('#err-msg').css("display","block");
					}
				}
	});
	$('#login_form').submit(function(){
		account = $('#account').val();
		password = $('#password').val();
		$.ajax({
			type: 'POST',
			url: 'php/login.php',
			data: {tmp_account: account, tmp_password: password},
			success: function(data){
						if(data=="isLoggedIn"){
							$('#login_form').hide(300);
							$('#link-register').hide(300);
							$('#err-msg').hide(300); 
							$('#greet-user').show(300);
						}
						else{
							$('#err-msg').show(300);
						}
					}
		});
	});
	$('#logout').click(function(){
		$.ajax({
			url: 'php/logout.php'
		});
	});
});
