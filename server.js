const express = require('express');
const bodyparser = require('body-parser');
const fs = require('fs');
const app = express(); // express object

app.set("view engine", "hbs");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.use('/static', express.static(__dirname + "/public_static"));
// View things here

const MyApiRoute = require('./routes/myapi');
app.use('/myapi/mycart/', MyApiRoute);

app.listen(9000, function () {
    console.log("Server started on http://localhost:9000");
});