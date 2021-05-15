const { login, setToken, callbackMiddleware, logout } = require('./auth')
const { currentUser } = require('./user')

module.exports = {
    login,
    setToken,
    callbackMiddleware,
    logout,
    currentUser
}