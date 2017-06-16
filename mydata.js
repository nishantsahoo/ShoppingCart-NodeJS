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

function getProducts () { return Product.findAll(); } // end of the function getProducts

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

function noofproducts()
{
    if(Cart.sum('quantity'))
        return Cart.sum('quantity');
    else
        return 0;
} // end of the function noofproducts

function totalamount()
{
    if(Cart.sum('amount'))
        return Cart.sum('amount');
    else
        return 0;
}

function cartCheckout(data) { Cart.destroy({ where: {}}); } // end of the function cartCheckout

function delFromCart(cartItemID)
{
    Cart.destroy({
      where: {
        id: cartItemID
      }
    });
}

module.exports = {
    getProducts,
    addToCart,
    getCart,
    cartCheckout,
    noofproducts,
    totalamount,
    delFromCart
};