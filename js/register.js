var account, password, email, phone, age, customerName;
$(document).ready(function(){
	$.ajax({
		url: 'php/checkRegister.php',
		success: function(data){
					if(data.submitRegistration == true){
						$('#account').attr("value", data.account);
						$('#password').attr("value", data.password);
						$('#name').attr("value", data.name);
						$('#age').attr("value", data.age);
						$('#phone').attr("value", data.phone);
						$('#email').attr("value", data.email);
					}
					if(data.status=="success"){
						$('#err-msg').html("<a href='login.html'>Successful Registration! Login Now!</a>");
					}
					else if(data.status=="accountExisted"){
						$('#err-msg').html("Account already existed!");
					}
					else if(data.status=="phoneUsed"){
						$('#err-msg').html("Phone no. already used!");
					}
					else if(data.status=="emailUsed"){
						$('#err-msg').html("Email already used!");
					}
					else if(data.status=="fail"){
						$('#err-msg').html("Fail Registration!");
					}
					$('#err-msg').show(300);
				}
	});
	$('#register_form').submit(function(){
		account = $('#account').val();
		password = $('#password').val();
		customerName = $('#name').val();
		email = $('#email').val();
		phone = $('#phone').val();
		age = $('#age').val();
		$.ajax({
			type: 'POST',
			url: 'php/register.php',
			data: {reg_account:account, reg_password: password, reg_email: email, reg_phone: phone, reg_age: age, reg_customerName: customerName},
			success: function(data){
						if(data=="success"){
							$('#err-msg').html("<a href='login.html'>Successful Registration! Login Now!</a>");
							$('#err-msg').show(300);
						}
						else if(data=="accountExisted"){
							alert("exist");
							$('#err-msg').html("Account already existed!");
						}
						else if(data=="phoneUsed"){
							alert("phone");
							$('#err-msg').html("Phone no. already used!");
						}
						else if(data=="emailUsed"){
							alert("email");
							$('#err-msg').html("Email already used!");
						}
						else if(data=="fail"){
							alert("fail");
							$('#err-msg').html("Fail Registration!");
						}
					}
		});
	});
});
