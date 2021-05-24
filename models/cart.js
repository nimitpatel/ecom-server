const { Schema, model } = require('mongoose')

const cartItemSchema = new Schema({
    pId: Number,
    qnt: Number
})

const cartSchema = new Schema({
    uId: { type: Schema.Types.ObjectId, ref: 'user' },
    items: [cartItemSchema]
})

model('cart', cartSchema)