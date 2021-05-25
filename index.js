
const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    cookieParser = require('cookie-parser'),
    cors = require('cors'),
    passport = require('passport'),
    dotenv = require('dotenv'),
    keys = require('./config/keys')

// env setup
dotenv.config()

// Models register
require('./models')

// Service register
require('./services/passport')

// connect to db
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
    if (err) throw err
    console.log('connected to db');
    mongoose.set("debug", keys.ENV === "dev");
})

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Enabling Cors
app.use(function (req, res, next) {
    const allowedOrigins = [
        "http://localhost:3000"
    ];
    const reqOrigin = req.get("origin");
    if (allowedOrigins.find((origin) => origin === reqOrigin)) {
        res.header("Access-Control-Allow-Origin", reqOrigin);
    }
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
        "Access-Control-Allow-Methods",
        "GET,HEAD,OPTIONS,POST,PUT,PATCH,OPTIONS,DELETE"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept,authorization"
    );

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    next();
})

// cookie parser
app.use(cookieParser());

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
require('./routes')(app)

app.use('/', (req, res) => {
    res.send('It worked')
})

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Running on Port:', PORT));