const route = require('express').Router();
const data = require('../mydata');

route.get('/', (req, res) => {

    data.getProducts().then((products) => {
        res.send(products);
    })

});

/*
route.get('/products', (req, res) => {

    data.getProducts().then((products) => {
        res.send(products);
    })

});
*/

/* 
route.post('/new', (req, res) => {

    data.addToCart(req.body.newtodo).then(()=> {
        res.redirect('/myapi/mycart') // google this. why do we redirect this to /api/todos
    }).catch((err) => {
        res.send(err)
    })
});
*/
module.exports = route;

// add to cart, plus, minus button functions are called from here.
// these functions are declared in data.js