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




var products = [
        {
            "name": 'Product_1',
            "price": 1500,
            "quantity": 1,
        },
        {
            "name": 'Product_2',
            "price": 400,
            "quantity": 1,
        },
        {
            "name": 'Product_3',
            "price": 1000,
            "quantity": 1,
        },
        {
            "name": 'Product_4',
            "price": 2000,
            "quantity": 1,
        },
        {
            "name": 'Product_5',
            "price": 4000,
            "quantity": 1,
        },
        {
            "name": 'Product_6',
            "price": 3000,
            "quantity": 1,
        }
]

/*
for (i=0;i<6;i++) {
    initProducts(products[i]);
    for(j=0;j<1000000000;j++);
}
*/

function getProducts () {
    return Product.findAll({
        where:
            {
                quantity: 1
            }
    });
}

Product.create(products[5]);