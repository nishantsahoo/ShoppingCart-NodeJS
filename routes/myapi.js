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


route.get('/cartitems', (req, res) => {

    data.getCart().then((cart) => {
        res.send(cart);
    })

});

route.get('/iscartempty', (req, res) => {

    data.noOfProducts().then((count) => {
        res.send(count);
    })

});

route.post('/checkout', (req, res) => {
    data.cartCheckout(req.body.name).then(()=> {
        res.redirect('/myapi/mycart');
    }).catch((err) => {
        
    })
});


module.exports = route;