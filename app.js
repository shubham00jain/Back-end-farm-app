const express = require('express');
const app = express();
const path = require('path');
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

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));

app.get('/products', async (req,res) => {
    const products = await Product.find({});
    console.log(products);
    res.render('products/index', {products:products})
})

app.post('/products', async (req,res) =>{
    const newProd = new Product(req.body);
    await newProd.save();
    console.log(newProd);
    res.redirect('/products');
})

app.get('/products/new', (req,res) =>{
    res.render('products/new');
})

app.get('/products/:id', async (req,res) => {
    const { id } = req.params;
    const p = await Product.findById(id);
    console.log(p);
    res.render('products/show', {p});

})


app.listen(3000, ()=>{
    console.log("Server Started on port 3000");
})