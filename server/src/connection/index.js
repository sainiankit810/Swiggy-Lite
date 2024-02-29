require('dotenv').config();
const mongoose = require('mongoose');
const mongoDB = process.env.MONGO_URI;

mongoose.connect(mongoDB)
.then(() => {
    console.log('Connected to MongoDB')
})
.catch((err) => {
    console.log('Error in connecting to MongoDB', err)
})

module.exports = mongoose;
