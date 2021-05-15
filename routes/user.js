const { Router } = require('express');
const { currentUser } = require('../controllers');
const verifyToken = require('../middleware/verifyToken');

const route = Router()

route.get('/current', verifyToken, currentUser)

module.exports = route