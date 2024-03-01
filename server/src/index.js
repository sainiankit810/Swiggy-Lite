require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();
const port = process.env.PORT;
require('./connection');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

const homeRoute = require('./routes/home');
const userRoute = require('./routes/user')
const restroRoute = require('./routes/restaurants')
const menuRoute = require('./routes/menu')
const addressRoute = require('./routes/address')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('This is the home page of the server.');
});

app.use('/api', homeRoute);
app.use('/api/user', userRoute);
app.use('/api/restaurants', restroRoute);
app.use('/api/restaurants/menu', menuRoute);
app.use('/api/user/address', addressRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

