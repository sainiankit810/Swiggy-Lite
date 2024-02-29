const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    
    password: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    // location: {
    //     type: {
    //         type: String,
    //         enum: ['Point'],
    //     },
    //     coordinates: {
    //         type: [Number],
    //         required: true
    //     }
    // },

    phone: {
        type: String,
        required: true
    },

    cuisine: {
        type: Array,
        default: []
    },

    openingTime: {
        type: String,
        default: ""
    },

    closingTime: {
        type: String,
        default: ""
    },

},
{
    timestamps: true
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;