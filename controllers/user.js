const mongoose = require('mongoose')

const User = mongoose.model('user')


const currentUser = async (req, res) => {
    await User.findOne({ googleId: req.googleId }).select('name profile').then(async user => {
        const userData = {
            userId: user._id,
            name: user.name,
            profile: user.profile
        };
        res.send({
            code: 1,
            data: userData
        });
    }).catch(err => res.send({ code: 0, error: err }));
}

module.exports = {
    currentUser
}