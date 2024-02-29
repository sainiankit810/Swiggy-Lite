const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    order_id: {
        type: String,
        required: true
    },

    total_amount: {
        type: Number,
        required: true
    },

    payment_method: {
        type: String,
        required: true
    },

    payment_status: {
        type: String,
        required: true
    },

},
{
    timestamps: true
});