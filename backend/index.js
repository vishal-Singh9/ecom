require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
require('./db/config');
const app = express();

const User = require('./db/User'); 
const Product = require('./db/Product'); 

// Middleware
app.use(express.json());
app.use(cors());

// APIs
app.post(process.env.REGISTER_URL, async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    res.send(result);
});

app.post(process.env.LOGIN_URL, async (req, res) => {
    if (req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            res.send(user);
        } else {
            res.send({ result: "No user found" });
        }
    } else {
        res.send({ result: "No user found" });
    }
});

app.post(process.env.ADD_PRODUCT_URL, async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
});

app.get(process.env.GET_PRODUCTS_URL, async (req, res) => {
    let products = await Product.find();
    if (products.length > 0) {
        res.send(products);
    } else {
        res.send({ result: "No products found" });
    }
});

app.delete(process.env.DELETE_PRODUCT_URL, async (req, res) => {
    const result = await Product.deleteOne({ _id: req.params.id });
    res.send(result);
});

app.get(process.env.GET_PRODUCT_URL, async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        res.send(result);
    } else {
        res.send({ result: "No product found" });
    }
});

app.put(process.env.UPDATE_PRODUCT_URL, async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    );
    res.send(result);
});

app.get(process.env.SEARCH_PRODUCTS_URL, async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key, $options: 'i' } },
            { company: { $regex: req.params.key, $options: 'i' } },
            { category: { $regex: req.params.key, $options: 'i' } }
        ]
    });
    res.send(result);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
