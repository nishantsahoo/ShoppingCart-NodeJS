const Sequelize = require('sequelize');
const db = new Sequelize('test', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 5000
    }
});

const Product = db.define('products', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    price: Sequelize.INTEGER,
    quantity: Sequelize.INTEGER
}); // used to define the Table

db.sync({}); // executes db.define

const Cart = db.define('carts', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    price: Sequelize.INTEGER,
    quantity: Sequelize.INTEGER,
    amount: Sequelize.INTEGER
}); // used to define the Table

db.sync({}); // executes db.define

function getProducts () {
    return Product.findAll();
}

function addToCart (product) {
    return Cart.create({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        amount: product.price*product.quantity
    });
} // end of the function addToCart

function getCart() {
    return Cart.findAll();
} // end of the function getCart

function noOfProducts() {
    var a = getCart();
    console.log(a);
}

function cartCheckout(data) {
    Cart.destroy();

} // end of the function cartCheckout

module.exports = {
    getProducts,
    addToCart,
    getCart,
    cartCheckout,
    noOfProducts
};