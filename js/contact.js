var firstName, lastName, email, telephone, msg;
$(document).ready(function(){
	$('#contact_form').submit(function(){
	
		firstName = $('#firstName').val();
		lastName = $('#lastName').val();
		email = $('#email').val();
		telephone = $('#telephone').val();
		msg = $('#msg').val();
		$.ajax({
			type: 'POST',
			url: 'php/contact_form.php',
			data:{tmp_firstName:firstName, tmp_lastName:lastName, tmp_email:email, tmp_telephone:telephone, tmp_msg:msg},
			complete: function(data){
						alert("We have received your message. We'll reply as soon as possible!");
					}
		});
	});
});
