// $ function is loaded only once HTML has completely loaded
$(function()
{
	var done = false; // done var is used to keep a check whether the cart is empty or not
    var no_of_products = 0;
    var total_cost = 0;
    
    function getNoOfProducts() { return (+$('#noOfProducts').text()); } // end of the function isCartEmpty

    function setTotalCost(totalamount) // definition of the function setTotalCost
    {
        if (totalamount)
        {
            total_cost = totalamount;
            $('#totalCost').text(total_cost);    
        }
        else
        {
            total_cost = 0;
            $('#totalCost').text(0);        
        }
        if ($('#totalCost').text()=="NaN")
        {
            $('#totalCost').text(0);
        }
    } // end of the function setTotalCost

    function setNoOfProducts(value) // definition of the function setNoOfProducts
    {
        if (value)
        {
            no_of_products = value;
            $('#noOfProducts').text(no_of_products);
        }
        else
        {
            no_of_products = 0;
            $('#noOfProducts').text(no_of_products); 
        }
        if ($('#noOfProducts').text()=="NaN")
        {
            $('#noOfProducts').text(0);
        }
    } // end of the function setNoOfProucts 

    function updateCart() // definition of the function updateCart
    {
        // this function is used to update the cart
    	if (getNoOfProducts()) 
        {
    		if (!done) 
            { 
                // to load the table heads on refresh of the page if (no_of_products>0)
    			var cart_head = $('#cartItemsHead');
    			var head_string = "<tr><th>Product Name</th><th>Price</th><th>Quantity</th><th>Amount</th><tr>";
    			cart_head.append(head_string);
    			done = true;
    		}
    		var cart_body = $('#cartItemsBody');
    		cart_body.empty(); // to delete its elements
            $.get('/myapi/mycart/getcart', function (items) // get cart items here
            {
                if(items)
                {
                    for(cartItem in items)
                    {
                        cart_body = $('#cartItemsBody');
                        var cartString = "<tr><td><button id=" + items[cartItem].id + " class=" + "red" + " name=" + "delCartItem" + ">x</button><cname id=" + items[cartItem].id + ">"+items[cartItem].name+"</cname></td>";
                        cartString += "<td><cprice id=" + items[cartItem].id + ">" + items[cartItem].price + "</cprice></td>";
                        cartString += "<td><button id=" + items[cartItem].id + " name=" + "cminus" + " class=" + "red" + ">-</button>";
                        cartString += "<cquant id=" + items[cartItem].id + ">"+items[cartItem].quantity+"</cquant>";
                        cartString += "<button id=" + items[cartItem].id + " name=" + "cplus" + " class=" + "green" +">+</button></td>";
                        cartString +="<td><camount id=" + items[cartItem].id + ">"+items[cartItem].amount+"</camount></td></tr>";
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
        for (var i = 0; i < 6 ; i++) 
        {
            if (cButtonsMinus[i]) // check if the button exists
            {
                cButtonsMinus[i].style.float = "left";
                cButtonsPlus[i].style.float = "right";   
            }
            if (pButtonsPlus[i]) // check if the button exists
            {
                pButtonsMinus[i].style.float = "left";
                pButtonsPlus[i].style.float = "right";
            }
        }
    } // end of the function setCartStyle

    function cartRefresh() // every time the page is loaded, the card is refreshed
    {
        $.get('/myapi/mycart/totalamount', function (AMOUNT)
        {
            setTotalCost(AMOUNT); // call of the function setNoOfProducts
            $.get('/myapi/mycart/countproducts', function (count)
            {
                setNoOfProducts(count); // call of the function setNoOfProducts
                updateCart(); // call of the function updateCart
            });
        });
    } // end of the function cartRefresh

    function setProductsTable(products) // definition of the function setProductsTable
    {
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
        setCartStyle(); // call of the function setCartStyle
    } // end of the function setProductsTable

    function reset() // definition of the function reset
    {
        no_of_products = 0;
        total_cost = 0;
        $('#totalCost').text(total_cost);
        $('#noOfProducts').text(0);
        for (var i = 1; i <= 6 ; i++)
        {
            $('quantity[id=' + i +']').text(1);
        }
        var cart_head = $('#cartItemsHead');
        cart_head.empty(); // to remove the child elements
        var cart_body = $('#cartItemsBody');
        cart_body.empty(); // to remove the child elements
        done = false;
    } // end of the function reset

    function init() // definition of the function init
    {
        // this is the first function that is called in this file
        $.get('/myapi/mycart/', function (data) 
        { 
            setProductsTable(data); // call of the function setProductsTable
            cartRefresh(); // call of the function cartRefresh
            if(getNoOfProducts())
            {
                reset(); // call of the function reset if the cart is empty
            }
            setCartStyle(); // set styles
        }); // call of the function setProductsTable
    	
    } // end of the function init

    init(); // call of the function init
    // first function to be called in this script

    function qtyDecrement(qty_id) // definition of the function qtyDecrement
    {
    	if (($('quantity[id=' + qty_id + ']').text())>1) // Quantity can't be less than 1
        {
    		var x = +$('quantity[id=' + qty_id + ']').text();
    		$('quantity[id=' + qty_id + ']').text(--x);	
    	}
    } // end of the function qtyDecrement

    function qtyIncrement(qty_id) // definition of the funtion qtyIncrement
    {
    	var x = +$('quantity[id=' + qty_id + ']').text();
    	$('quantity[id=' + qty_id + ']').text(++x);
    } // end of the function qtyIncrement

    // Very important function
    $('body').on('click', '.red' , function() // To access elements after they've been dynamically updated
    {
        if (this.name == "delCartItem")
        {
    		$.post('/myapi/mycart/delfromcart', {id: this.id}, function (data)
            {
                cartRefresh(); // call of the function cartRefresh
                if(!getNoOfProducts())
                {
                    done = false;
                }
            });
    	} // delCartItem button

        if (this.name == "cminus") // minus button for cart
        {
            $('cquant[id=' + this.id + ']').text();
            if (($('cquant[id=' + this.id + ']').text())>1)// Quantity can't be lesser than 1
            {
                var x = +$('cquant[id=' + this.id + ']').text();
                $('cquant[id=' + this.id + ']').text(--x); 
                $.post('/myapi/mycart/decrementCart', {id: this.id}, function (data)
                {
                    cartRefresh(); // call of the function cartRefresh
                });
            }
        } // cminus button

        if (this.name == "minus") { qtyDecrement(this.id); } // minus button

     });

    $('body').on('click', '.green' , function() // To delete elements after they've been dynamically updated
    {
        if (this.name == "cplus")
        {
            var x = +$('cquant[id=' + this.id + ']').text();
            $('cquant[id=' + this.id + ']').text(++x);
            var qty = +$('cquant[id=' + this.id + ']').text();
            // update cart table
            $.post('/myapi/mycart/incrementCart', {id: this.id}, function (data)
            {
                cartRefresh(); // call of the function cartRefresh
            });
        } // cplus button

        if (this.name == "plus") { qtyIncrement(this.id); } // plus button
     });

    $('body').on('click', '.blue' , function()
    {
        if (this.name == "checkout")
        {
            $.post('/myapi/mycart/checkout', {name: "checkout"}, function (data) { });
            alert('Thank you for shopping!');
            reset(); // call of the function reset
        }
    }); // checkout button

    $('body').on('click', '.purple' , function()
    {
        if (this.name == "add-to-cart")
        {
            var name = $('product[id=' + this.id + ']').text(); 
            var qty = +$('quantity[id=' + this.id + ']').text();
            var cost = +$('price[id=' + this.id + ']').text();
            var amount = qty*cost;
            p = {
                'id': this.id,
                'name': name,
                'price': cost,
                'quantity': qty,
                'amount': amount
            };
            $('quantity[id=' + this.id + ']').text(1);
            $.post('/myapi/mycart/addtocart', {product: p}, function (data)
            {
                cartRefresh(); // call of the function cartRefresh
                setCartStyle(); // call of the function setCartStyle
            });
        }
    }) // add-to-cart button

}); // end of the script file