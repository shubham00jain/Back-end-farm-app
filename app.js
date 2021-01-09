const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')


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
app.use(methodOverride('_method'));


app.get('/products', async (req,res) => {
    const products = await Product.find({});
    res.render('products/index', {products:products})
})

app.post('/products', async (req,res) =>{
    const newProd = new Product(req.body);
    await newProd.save();
    res.redirect('/products');
})

app.get('/products/new', (req,res) =>{
    res.render('products/new');
})

app.get('/products/:id', async (req,res) => {
    const { id } = req.params;
    const p = await Product.findById(id);
    res.render('products/show', {p});

})

app.get('/products/:id/edit', async (req,res) =>{
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', {product:product});
})

app.put('/products/edit/:id', async (req,res) =>{ 
    console.log(req.body);
    res.send("A put request!!");
})

app.listen(3000, ()=>{
    console.log("Server Started on port 3000");
})