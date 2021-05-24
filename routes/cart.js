const { Router } = require('express')
const { getCartItems, addToCard, deleteFromCart } = require('../controllers')
const verifyToken = require('../middleware/verifyToken')

const route = Router()

route.get('/items', verifyToken, getCartItems)
route.post('/add', verifyToken, addToCard)
route.delete('/delete/:id', verifyToken, deleteFromCart)

module.exports = route