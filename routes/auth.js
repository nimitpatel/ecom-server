const { Router } = require('express');
const { login, callbackMiddleware, setToken, logout } = require('../controllers');

const route = Router()

route.get('/google', login)
route.get('/google/callback', callbackMiddleware, setToken)
route.get('/logout', logout)

module.exports = route