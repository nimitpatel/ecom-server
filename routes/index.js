module.exports = app => {
    app.use('/auth', require('./auth'))
    app.use('/user', require('./user'))
}