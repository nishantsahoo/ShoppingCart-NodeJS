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
    if (Cart.findAll())
        return Cart.findAll();
    else
        return 0;
} // end of the function getCart

function noofproducts() {
    return Cart.count();
}
function cartCheckout(data) {
    Cart.destroy({ where: {}});

} // end of the function cartCheckout

module.exports = {
    getProducts,
    addToCart,
    getCart,
    cartCheckout,
    noofproducts
};