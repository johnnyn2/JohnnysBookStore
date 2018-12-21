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
		url: 'php/loadPreferDate.php',
		success: function(data){
					$('#preferdate').html(data);
				}
	});
});
