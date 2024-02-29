const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deliverySchema = new Schema({
    order_id: {
        type: String,
        required: true
    },

    driver_id: {
        type: String,
        required: true
    },

    driver_name: {
        type: String,
        required: true
    },

    driver_email: {
        type: String,
        required: true
    },

    driver_phone: {
        type: String,
        required: true
    },

    driver_location: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },

    delivery_status: {
        type: String,
        required: true
    },
},
{
    timestamps: true
});