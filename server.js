const express = require('express');
const bodyparser = require('body-parser');
const app = express(); // express object

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.use('/static', express.static(__dirname + "/public_static"));

const MyApiRoute = require('./routes/myapi');
app.use('/myapi/mycart/', MyApiRoute);
app.listen(9000, function () {
    console.log("Server started on http://localhost:9000");
});