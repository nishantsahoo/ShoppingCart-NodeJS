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

function initProducts (product) {
    return Product.create({
        name: product.name,
        price: product.price,
        quantity: product.quantity
    });
}

var products = {
        '0': {
            "name": 'Product_1',
            "price": 1500,
            "quantity": 1,
        },
        '1': {
            "name": 'Product_2',
            "price": 400,
            "quantity": 1,
        },
        '2': {
            "name": 'Product_3',
            "price": 1000,
            "quantity": 1,
        },
        '3': {
            "name": 'Product_4',
            "price": 2000,
            "quantity": 1,
        },
        '4': {
            "name": 'Product_5',
            "price": 4000,
            "quantity": 1,
        },
        '5': {
            "name": 'Product_6',
            "price": 3000,
            "quantity": 1,
        }
}

for (index in products) {
    initProducts(products[index]);
}

function getProducts () {
    return Product.findAll({
        where:
            {
                quantity: 1
            }
    });
}

prods = getProducts();
for (p in prods)
{
    console.log(p);
}
