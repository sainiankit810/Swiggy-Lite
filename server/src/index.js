require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();
const port = process.env.PORT;
require('./connection');

app.use(cors());

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
const cartRoute = require('./routes/cart')
const orderRoute = require('./routes/order')
const paymentRoute = require('./routes/payment')

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
app.use('/api/user/cart', cartRoute);
app.use('/api/user/order', orderRoute);
app.use('/api/user/order/payment', paymentRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

