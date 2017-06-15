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

const Product = db.define('product', {
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
// force true

function getProducts () {
    return Product.findAll();
}

function addToCart (product) {
    return Product.create({
        name: "",
        price: 0,
        quantity: 1
    })
}

module.exports = {
    getProducts,
    addToCart
};