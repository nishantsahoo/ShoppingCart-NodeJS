const express = require('express');
const bodyparser = require('body-parser');
const app = express(); // express object

// app.set("view engine", "hbs"); // not needed

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.use('/static', express.static(__dirname + "/public_static"));

const CartApiRoute = require('./routes/cartapi');
app.use('/api/cart', CartApiRoute);
const ProductApiRoute = require('./routes/productapi');
app.use('/api/product', ProductApiRoute);

// const pageRoute = require('./routes/pages');
// app.use('/todos', pageRoute);

app.listen(2076, function () {
    console.log("Server started on http://localhost:2076");
});