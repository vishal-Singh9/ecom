const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name:String,
    price:Number,
    category:String,
    UserId:String,
    company:String

})
module.exports = mongoose.model('products',ProductSchema)