const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    email: String,
    name: String,
    profile: String
})

mongoose.model('user', userSchema);