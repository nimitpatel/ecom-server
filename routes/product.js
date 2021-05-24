const { Router } = require('express');
const { productList, productDetails } = require('../controllers');
const verifyToken = require('../middleware/verifyToken');

const route = Router()

route.get('/list', verifyToken, productList)
route.get('/detail/:id', verifyToken, productDetails)

module.exports = route