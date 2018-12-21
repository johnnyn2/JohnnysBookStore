function Product(isbn, bname, quantity, price){
	this.isbn = isbn;
	this.bname = bname;
	this.quantity = quantity;
	this.price = price;
}
function MyProduct(id,desiredQuantity){
	this.id = id;
	this.desiredQuantity = desiredQuantity;
}
var myProducts = [];
var allProducts = [];
var previousDeleted = 0;
var deleteItems = 0;
var total = 0;
$(document).ready(function () {
	$.ajax({
		url: "php/loadProducts.php",
		success: function(data){
					var i = 0;
					$.each(data,function(key,val){
						
						allProducts[i] = new Product(val.isbn, val.bname, val.quantity, val.price);		
						i++;		
					});
				}
	});
	
	$('#confirm').click(function(event){
		var isLoggedIn = true;
		if(total==0){
			alert("Lets add a book to shopping cart!");
			event.preventDefault();
			return;
		}
		$.ajax({
			url: "php/checkLogin.php",
			success: function(data){
						if(data.status == "notLoggedIn"){
							event.preventDefault();
							location.replace("login.html");
						}
					}
		});
		$.ajax({
			type: 'POST',
			url: 'php/setSESSION.php',
			data: { tmp_myProducts:myProducts, tmp_total:total}
		});
	});
	
	$('#sidebarCollapse').on('click', function () {
		$('#sidebar').toggleClass('active');
		$(this).toggleClass('active');
	});
		
	$('#content nav div div ul li').click(function(){
				
		var index = $('#content nav div div ul li').index(this);
		if(index!=0){
			$('#link-news').css("font-weight", "normal");
			$('#link-news').removeClass('active');
		}
		else{
			$('#link-news').css("font-weight", "bold");
			$('#link-news').addClass('active');
		}
		$(this).addClass('active');
		$('#content>div:visible').hide(1000);
		$('.product-page:eq('+index+')').show(1000);
			
	});
			
	$('#btn-viewCart').click(function(event){
		$('#overlay').fadeIn(500);
		$('#shopping-cart').fadeIn(500);
	});
	$('#overlay').click(function(){
		$(this).fadeOut(500);
		$('#shopping-cart').fadeOut(500);
	});
	
	
});
function showCart(k){
	var html = "", newProduct = myProducts.length-1;
	html += '<tr id="cartRow'+newProduct+'"><td>'+myProducts.length+'</td><td>'+allProducts[myProducts[newProduct].id].bname+'</td><td>'+
			allProducts[myProducts[newProduct].id].price+'</td><td><input type="number" id="'+newProduct+'" min="1" max="20" value="'+myProducts[newProduct].desiredQuantity+'" onclick="adjustTotal(this)"></td><td><button id="'+allProducts[myProducts[newProduct].id].isbn+'" class="btn btn-danger btn-remove" onclick="removeProduct(this)"><i class="fas fa-times"></i></button></td></tr>';
	$('#cartRow'+(newProduct-1)).after(html);
}
function adjustTotal(item){
	myProducts[$(item).attr("id")].desiredQuantity = $(item).val();
	showTotal();
}
function showTotal(){
	var tmp_total =0;
	for(var i=0;i<myProducts.length;i++){
		tmp_total = tmp_total + allProducts[myProducts[i].id].price * myProducts[i].desiredQuantity;
	}
	total = tmp_total;
	$('#total').html("$"+total);
}
function removeProduct(item){
	var i=0;
	for(;i<allProducts.length;i++){
		if($(item).attr('id')==allProducts[i].isbn){
			break;
		}
	}
	var j=0;
	for(;j<myProducts.length;j++){
		if(myProducts[j].id==i){
			myProducts.splice(j,1);
			break;
		}
	}
	$('#cartRow'+j).remove();
	for(var k=j+1;k<=myProducts.length;k++){
		$('#cartRow'+k).attr('id',"cartRow"+(k-1));
	}
	showTotal();
}
function addToCart(item){
	var wasAdded = false;
	if($('#quantity'+$(item).attr('id')).val()!=""){
		for(var i=0;i<myProducts.length;i++)
			if(myProducts[i].id==$(item).attr('id')){
				wasAdded = true;
				break;
			}
		if(!wasAdded){
			myProducts.push(new MyProduct($(item).attr('id'),1));
			showCart($(this).attr('id'));
			showTotal();
		}
	}
}		
