const route = require('express').Router();
const data = require('../mydata');

route.get('/', (req, res) => {

    data.getProducts().then((products) => {
        res.send(products);
    })

});


route.post('/addtocart', (req, res) => {
    data.addToCart(req.body.product);
    res.redirect('/myapi/mycart');
});

route.post('/checkout', (req, res) => {
    data.cartCheckout(req.body.name).then(()=> {
        res.redirect('/myapi/mycart');
    }).catch((err) => {
        
    })
});


route.get('/getcart', (req, res) => {

    data.getCart().then((cart) => {
        res.send(cart);
    })

});

route.get('/countproducts', (req, res) => {

    data.noofproducts().then((count) => {
    	if(!count) {
    		res.send('' + 0); // CONVERT INTO A STRING ELSE INTEGERS ARE SENT AS STATUS CODE
    	}
        res.send('' + count);
    })

});

module.exports = route;