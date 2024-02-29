const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },

    restaurant_id: {
        type: String,
        required: true
    },

    cart_items: {
        type: Array,
        required: true
    },

    total_amount: {
        type: Number,
        required: true
    },
},
{
    timestamps: true
});