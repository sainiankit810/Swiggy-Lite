const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },

    // restaurant_id: {
    //     type: String,
    //     required: true
    // },

    order_items: {
        type: Array,
        required: true
    },

    order_time: {
        type: String,
        required: true
    },

    order_status: {
        type: String,
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

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;