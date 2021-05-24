const { Schema, model } = require('mongoose')

const productListSchema = new Schema({
    image: String,
    category: String,
    pId: Number,
    pName: String,
    inStock: Boolean
})

model('productlist', productListSchema)