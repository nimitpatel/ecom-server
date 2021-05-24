const { login, setToken, callbackMiddleware, logout } = require('./auth')
const { currentUser } = require('./user')
const { productList, productDetails } = require('./product')
const { getCartItems, addToCard, deleteFromCart } = require('./cart')

module.exports = {
    login,
    setToken,
    callbackMiddleware,
    logout,
    currentUser,
    productList,
    productDetails,
    getCartItems,
    addToCard,
    deleteFromCart
}