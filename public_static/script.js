// $ function is loaded only once HTML has completely loaded

$(function() {

    var products = {
        '0': {
            "name": 'Product_1',
            "price": 1500,
            "quantity": 1,
        },
        '1': {
            "name": 'Product_2',
            "price": 400,
            "quantity": 1,
        },
        '2': {
            "name": 'Product_3',
            "price": 3770,
            "quantity": 1,
        }
    }
    console.log(products[0])

	var done = false; // done var is used to keep a check whether the cart is empty or not
    
    function isCartEmpty() {
        var counter = 0;
        for(i=1;i<=3;i++)
        {
            if (localStorage.getItem('prod_' + i)) {
                counter++;
            }
        }
        return counter;
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

    function setNoOfProducts() {
    	var no_of_products = 0;
    	for(i=1;i<=3;i++)
    	{
    		if (localStorage.getItem('prod_' + i)) {
    			no_of_products += JSON.parse(localStorage.getItem('prod_' + i)).quantity;
		    }
    	}
    	localStorage.setItem('no_of_products', no_of_products);
    	if (localStorage.getItem('no_of_products')) {
    		no_of_products = +localStorage.getItem('no_of_products');
    		$('#noOfProducts').text(no_of_products);
    	}
    	else {
    		localStorage.setItem('no_of_products', '0');
    		no_of_products = +localStorage.getItem('no_of_products');
    		$('#noOfProducts').text(no_of_products);
    	}
    } // end of the function setNoOfProucts 

    function updateCart() {
    	
    	no_of_products = +localStorage.getItem('no_of_products');
    	if (no_of_products) {
    		if (!done) { // to load the table heads on refresh of the page if (no_of_products>0)
    			var cart_head = $('#cartItemsHead');
    			var head_string = "<tr><th>Product Name</th><th>Quantity</th><th>Amount</th><tr>";
    			cart_head.append(head_string);
    			done = true;
    		}

    		// display using cart.append
    		var cart_body = $('#cartItemsBody');
    		cart_body.empty(); // to delete its elements
    		for(i=1;i<=3;i++)
    		{
    			if (localStorage.getItem('prod_'+i)) {
    				cartItem = JSON.parse(localStorage.getItem('prod_'+i));
    				var name = $('product[id=' + i + ']').text();
    				var cost = +$('price[id=' + i + ']').text();
    				var amount = cost*cartItem.quantity;
    				var delCart = "delCartItem";
    				var cartString = "<tr><td><button id=" + i + " class=" + "red" + " name=" + "delCartItem" + ">x</button><cname id=" + i + ">"+name+"</cname></td>";
    				cartString += "<td><button id=" + i + " name=" + "cminus" + " class=" + "red" + ">-</button>";
    				cartString += "<cquant id=" + i + ">"+cartItem.quantity+"</cquant>";
    				cartString += "<button id=" + i + " name=" + "cplus" + " class=" + "green" +">+</button></td>";
    				cartString +="<td><camount id=" + i + ">"+amount+"</camount></td></tr>";
    				cart_body.append(cartString);
    			}
    		}
            setCartStyle(); // call of the function setCartStyle
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
        for (var i = 0; i < 3 ; i++) {
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
    	setNoOfProducts(); // call of the function setNoOfProducts
    	updateCart(); // call of the function updateCart
    } // end of the function cartRefresh

    function setProductsTable() {

        productBody = $('#productItemsBody');
        for(i=0;i<3;i++)
        {
            var productString = "<tr><td><product id=" + (i+1) + ">" + products[i].name + "</product></td>";
            productString +="<td><price id=" + (i+1) + ">" + products[i].price + "</price></td>";
            productString += "<td><button id=" + (i+1) + " name=" + "minus" + " class=" + "red" + ">-</button>";
            productString += "<quantity id=" + (i+1) + ">" + products[i].quantity + "</quantity>";
            productString += "<button id=" + (i+1) + " name=" + "plus" + " class=" + "green" +">+</button></td>";
            productString += "<td><button id=" + (i+1) + " style=" + "margin-left: 0.85em" + " name=" + "add-to-cart" + " class=" + "purple" + ">Add to Cart</button></td></tr>";
            productBody.append(productString);
        }
        /*
        for (var i = 1; i <= 3 ; i++) {
            $('quantity[id=' + i +']').text(1);
        }
        */
    }

    function init() {
        setProductsTable();
    	cartRefresh(); // call of the function cartRefresh
        setCartStyle();

    } // end of the function init

    init(); // call of the function init

    function reset() {
    	localStorage.setItem('no_of_products', 0);
    	no_of_products = +localStorage.getItem('no_of_products');
    	$('#totalCost').text(no_of_products);
    	localStorage.setItem('total_cost', 0);
    	total_cost = +localStorage.getItem('total_cost');
    	$('#noOfProducts').text(total_cost);
    	for (var i = 1; i <= 3 ; i++) {
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
            var qty = +$('cquant[id=' + this.id + ']').text();
            cartItem = JSON.parse(localStorage.getItem('prod_'+this.id));
                newcartItem = {
                    'id': this.id,
                    'quantity': (qty)
                };
                localStorage.removeItem('prod_'+this.id)
                localStorage.setItem('prod_' + this.id, JSON.stringify(newcartItem));
            cartRefresh(); // call of the function cartRefresh
        } // cminus button

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
     });

    
    $("button").click(function() { // button click function

    	if (this.name == "plus") { // if '-' button is clicked
    		qtyIncrement(this.id); // increase quantity by 1
    	} // plus button

    	if (this.name == "minus") { // if '-' button is clicked
    		qtyDecrement(this.id); // decrease quantity by 1
    	} // minus button

    	if (this.name == "add-to-cart") {
    		var qty = +$('quantity[id=' + this.id + ']').text();
    		var cost = +$('price[id=' + this.id + ']').text();
    		// add to cart (local)
    		if (localStorage.getItem('prod_'+this.id)) {
	    		cartItem = JSON.parse(localStorage.getItem('prod_'+this.id));
	    		newcartItem = {
	    			'id': this.id,
	    			'quantity': (qty+cartItem.quantity)
	    		};
	    		localStorage.removeItem('prod_'+this.id)
	    		localStorage.setItem('prod_' + this.id, JSON.stringify(newcartItem));
	    	}
	    	else {
	    		newcartItem = {
	    			'id': this.id,
	    			'quantity': qty
	    		};
	    		localStorage.setItem('prod_' + this.id, JSON.stringify(newcartItem));	
	    	}
    		
    		cartRefresh(); // call of the function cartRefresh
            setCartStyle(); // call of the function setCartStyle
    		$('quantity[id=' + this.id + ']').text(1);
    	} // add-to-cart button
    	
    	if (this.name == "checkout") {
            alert('Thank you for shopping!');
    		reset(); // call of the function reset
    		for (var i = 3; i >= 1; i--) {
    			localStorage.removeItem('prod_' + i);
    		}
    	} // checkout button

	});
    
});
