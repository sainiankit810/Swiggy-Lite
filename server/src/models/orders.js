const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user_id: {
        type: String,
    },

    // restaurant_id: {
    //     type: String,
    //     required: true
    // },

    order_items: {
        type: Array,
    },

    order_time: {
        type: String,
    },

    order_status: {
        type: String,
    },

    total_amount: {
        type: Number,
    },
},
{
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;