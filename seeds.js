const mongoose = require('mongoose');

const Product = require('./models/product');

//connect moongoose to the server
mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO ERROR!!!!")
        console.log(err)
    })

const p = new Product({
    name: "Mango",
    price: 20,
    category: 'fruit'
});

p.save()
    .then(p => {
        console.log(p);
    })
    .catch(e => {
        console.log(e);
    })

const seedProducts = [
    {
        name: "Apple",
        price: 35,
        category: 'fruit'
    },
    {
        name: "Milk",
        price: 20,
        category: 'dairy'
    },
    {
        name: "potato",
        price: 10.5,
        category: 'vegetable'
    }
]

Product.insertMany(seedProducts)
    .then(r => {
        console.log(r);
    })