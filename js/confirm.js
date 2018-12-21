var today;
$(document).ready(function(){
	$.ajax({
		url: 'php/loadShoppingCart.php',
		success: function(data){
					var html ="", i=1;
					$.each(data,function(key,val){
						html += "<tr><td>"+i+"</td><td>"+val.bname+"</td><td>"+val.price+"</td><td>"+val.desiredQuantity+"</td></tr>";
						i++;
					});
					$('#HeadRow').after(html);
				}
	});
	$.ajax({
		url: 'php/loadTotal.php',
		success: function(data){
					$('#total').html("$ "+data);
				}
	});
	$.ajax({
		url: 'php/loadDates.php',
		success: function(data){
					$('#preferdate').attr('min',data.min_date);
					$('#preferdate').attr('max',data.max_date);
				}
	});
	$('#order').click(function(event){
		if($('#preferdate').val()==""){
			alert("Please select a pick-up date !");
			event.preventDefault();
			return false;
		}
		if(confirm("Are you sure to submit the order?")){
			today = $('#preferdate').val();
			$.ajax({
				type: 'POST',
				url: 'php/insertToDB.php',
				data: { preferDate:today },
				complete: function(data){
							alert("We have received your order. We will be in touch soon!");
						}
			});
			location.replace("final.html");
		}
		
	});
	$('#cancel').click(function(){
		if(confirm("Do you want to cancel the order?")){
			location.replace("ordering.html");
		}
	});
});
