const passport = require('passport')

const login = passport.authenticate(
    'google',
    {
        session: false,
        scope: [
            'email',
            'profile'
        ]
    }
)

const callbackMiddleware = passport.authenticate('google', { session: false })

const setToken = (req, res) => {
    let token = req.user.token
    res.cookie('ecom', token, { domain: '.proffie.me', expires: 10 });
    res.redirect('https://ecom.proffie.me/');
    // res.cookie('ecom', token);
    // res.redirect('http://localhost:3000/');
}

const logout = async (req, res) => {
    await res.clearCookie('ecom', { domain: '.proffie.me' });
    await res.clearCookie(`ecom.sig`, { domain: '.proffie.me' });
    res.redirect('https://ecom.proffie.me/');
    // await res.clearCookie('ecom');
    // await res.clearCookie(`ecom.sig`);
    // res.redirect('http://localhost:3000/');
}

module.exports = {
    login,
    callbackMiddleware,
    setToken,
    logout
}