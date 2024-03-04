const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
    user_id: {
        type: String,
    },

    restaurant_id: {
        type: String,
    },

    rating: {
        type: Number,
        required: true
    },
},
{
    timestamps: true
});

const Rating = mongoose.model('Rating', ratingSchema);
module.exports = Rating;