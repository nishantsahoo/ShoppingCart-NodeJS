// $ function is loaded only once HTML has completely loaded

$(function() {

	var done = false; // done var is used to keep a check whether the cart is empty or not
    var no_of_products = 0;
     
    function getNoOfProducts() {
        return 1;
    } // end of the function isCartEmpty

    function setTotalCost() {
    	var total_cost = 0;
    	for(i=1;i<=3;i++)
    	{
    		if (localStorage.getItem('prod_' + i)) {
    			var qty = JSON.parse(localStorage.getItem('prod_' + i)).quantity;
    			var cost = +$('price[id=' + i + ']').text();
    			total_cost += qty*cost;
		    }
    	}
    	if (localStorage.getItem('total_cost')) {
		    $('#totalCost').text(total_cost);
		    localStorage.setItem('total_cost', total_cost);
		}
		else {
		   	localStorage.setItem('total_cost', '0');
		   	$('#totalCost').text('0');
		}
    } // end of the function setTotalCost

    function setNoOfProducts(count) {
        no_of_products = count;
    	$('#noOfProducts').text(no_of_products);
    } // end of the function setNoOfProucts 

    function updateCart() {
    	
    	if (getNoOfProducts()) {
    		if (!done) { // to load the table heads on refresh of the page if (no_of_products>0)
    			var cart_head = $('#cartItemsHead');
    			var head_string = "<tr><th>Product Name</th><th>Price</th><th>Quantity</th><th>Amount</th><tr>";
    			cart_head.append(head_string);
    			done = true;
    		}

    		// display using cart.append
            // GET request
    		var cart_body = $('#cartItemsBody');
    		cart_body.empty(); // to delete its elements
            $.get('/myapi/mycart/getcart', function (data) {
                var items = data;
                if(items) {
                   for(cartItem in items)
                   {
                        cart_body = $('#cartItemsBody');
                        var cartString = "<tr><td><button id=" + items[cartItem].id + " class=" + "red" + " name=" + "delCartItem" + ">x</button><cname id=" + i + ">"+items[cartItem].name+"</cname></td>";
                        cartString += "<td><cprice id=" + i + ">" + items[cartItem].price + "</cprice></td>";
                        cartString += "<td><button id=" + i + " name=" + "cminus" + " class=" + "red" + ">-</button>";
                        cartString += "<cquant id=" + i + ">"+items[cartItem].quantity+"</cquant>";
                        cartString += "<button id=" + i + " name=" + "cplus" + " class=" + "green" +">+</button></td>";
                        cartString +="<td><camount id=" + i + ">"+items[cartItem].amount+"</camount></td></tr>";
                        cart_body.append(cartString);
                    }
                }
            setCartStyle(); // call of the function setCartStyle
            });    
            
    	}
    	else
    	{
    		var cart_head = $('#cartItemsHead');
    		cart_head.empty(); // to remove the child elements
    		var cart_body = $('#cartItemsBody');
    		cart_body.empty(); // to remove the child elements
    	}

    } // end of the function updateCart

    function setCartStyle() { // Using this function to set style of cminus and cplus buttons
        var cButtonsPlus = $('button[name="cplus"]');
        var cButtonsMinus = $('button[name="cminus"]');
        var pButtonsPlus = $('button[name="plus"]');
        var pButtonsMinus = $('button[name="minus"]');
        for (var i = 0; i < 6 ; i++) {
            if (cButtonsMinus[i]) { // check if the button exists
                cButtonsMinus[i].style.float = "left";
                cButtonsPlus[i].style.float = "right";
                
            }
            if (pButtonsPlus[i]) { // check if the button exists
                pButtonsMinus[i].style.float = "left";
                pButtonsPlus[i].style.float = "right";
            }
        }
    } // end of the function setCartStyle

    function cartRefresh() { // every time the page is loaded, the card is refreshed
    	setTotalCost(); // call of the function setTotalCost

        $.get('/myapi/mycart/countproducts', function (count) {
            setNoOfProducts(count); // call of the function setNoOfProducts
            updateCart(); // call of the function updateCart

        });
        
    	
    } // end of the function cartRefresh

    function setProductsTable(products) {
        productBody = $('#productItemsBody');
        for(product of products)
        {
            var productString = "<tr><td><product id=" + product.id + ">" + product.name + "</product></td>";
            productString +="<td><price id=" + product.id + ">" + product.price + "</price></td>";
            productString += "<td><button id=" + product.id + " name=" + "minus" + " class=" + "red" + ">-</button>";
            productString += "<quantity id=" + product.id + ">" + product.quantity + "</quantity>";
            productString += "<button id=" + product.id + " name=" + "plus" + " class=" + "green" +">+</button></td>";
            productString += "<td><button id=" + product.id + " style=" + "margin-left: 0.85em" + " name=" + "add-to-cart" + " class=" + "purple" + ">Add to Cart</button></td></tr>";
            productBody.append(productString);
        }
        setCartStyle();
    }

    function init() {
        $.get('/myapi/mycart/', function (data) {
            setProductsTable(data);
        });

    	cartRefresh(); // call of the function cartRefresh
        setCartStyle(); // set styles

    } // end of the function init

    init(); // call of the function init

    function reset() {
        total_cost = 0;
    	$('#totalCost').text(total_cost);
    	$('#noOfProducts').text(0);
    	for (var i = 1; i <= 6 ; i++) {
    		$('quantity[id=' + i +']').text(1);
    	}
    	var cart_head = $('#cartItemsHead');
    	cart_head.empty(); // to remove the child elements
    	var cart_body = $('#cartItemsBody');
    	cart_body.empty(); // to remove the child elements
    	done = false;
    } // end of the function reset

    function qtyDecrement(qty_id) {
    	if (($('quantity[id=' + qty_id + ']').text())>1) { // Quantity can't be lesser than 1
    		var x = +$('quantity[id=' + qty_id + ']').text();
    		$('quantity[id=' + qty_id + ']').text(--x);	
    	}
    } // end of the function qtyDecrement

    function qtyIncrement(qty_id) {
    	var x = +$('quantity[id=' + qty_id + ']').text();
    	$('quantity[id=' + qty_id + ']').text(++x);
    } // end of the function qtyIncrement

    // Very important function
    $('body').on('click', '.red' , function() { // To delete elements after they've been dynamically updated
    	if (this.name == "delCartItem") {
    		localStorage.removeItem("prod_" + this.id);
    		cartRefresh();
            if(!isCartEmpty())
            {
                done = false;
            }
    	} // delCartItem button

        if (this.name == "cminus") {
            $('cquant[id=' + this.id + ']').text()
            if (($('cquant[id=' + this.id + ']').text())>1) { // Quantity can't be lesser than 1
            var x = +$('cquant[id=' + this.id + ']').text();
            $('cquant[id=' + this.id + ']').text(--x); 
            }
            // update cart
            cartRefresh(); // call of the function cartRefresh
        } // cminus button

                if (this.name == "minus") { // if '-' button is clicked
            qtyDecrement(this.id); // decrease quantity by 1
        } // minus button


     });

    $('body').on('click', '.green' , function() { // To delete elements after they've been dynamically updated
        if (this.name == "cplus") {
            var x = +$('cquant[id=' + this.id + ']').text();
            $('cquant[id=' + this.id + ']').text(++x);
            var qty = +$('cquant[id=' + this.id + ']').text();
            cartItem = JSON.parse(localStorage.getItem('prod_'+this.id));
                newcartItem = {
                    'id': this.id,
                    'quantity': (qty)
                };
                localStorage.removeItem('prod_'+this.id)
                localStorage.setItem('prod_' + this.id, JSON.stringify(newcartItem));
                cartRefresh(); // call of the function cartRefresh
        }

        if (this.name == "plus") { // if '-' button is clicked
            qtyIncrement(this.id); // increase quantity by 1
        } // plus button

     });

    $('body').on('click', '.blue' , function() {
    if (this.name == "checkout") {
            $.post('/myapi/mycart/checkout', {name: "checkout"}, function (data) {
                
            });
            alert('Thank you for shopping!');
            reset(); // call of the function reset
            }
    }); // checkout button

    $('body').on('click', '.purple' , function() {
    if (this.name == "add-to-cart") {
            var name = $('product[id=' + this.id + ']').text(); 
            var qty = +$('quantity[id=' + this.id + ']').text();
            var cost = +$('price[id=' + this.id + ']').text();
            var amount = qty*cost;
            p = {
                'name': name,
                'price': cost,
                'quantity': qty,
                'amount': amount
            };
            $.post('/myapi/mycart/addtocart', {product: p}, function (data) {
                data = "";
            });
            setCartStyle(); // call of the function setCartStyle
            $('quantity[id=' + this.id + ']').text(1);
            cartRefresh();
        } // add-to-cart button
    })
});