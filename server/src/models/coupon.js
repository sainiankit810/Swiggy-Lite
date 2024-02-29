const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const couponSchema = new Schema({
    coupon_code: {
        type: String,
        required: true
    },

    discount: {
        type: Number,
        required: true
    },

    expiry_date: {
        type: Date,
        required: true
    },

    status: {
        type: Boolean,
        required: true
    },


},
{
    timestamps: true
});