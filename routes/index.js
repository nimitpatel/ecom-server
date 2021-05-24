module.exports = app => {
    app.use('/auth', require('./auth'))
    app.use('/user', require('./user'))
    app.use('/product', require('./product')),
    app.use('/cart', require('./cart'))
}