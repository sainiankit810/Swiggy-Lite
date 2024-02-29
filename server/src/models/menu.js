const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema({
    restaurant_id: {
        type: String,
    },

    item_name: {
        type: String,
        required: true
    },

    item_price: {
        type: Number,
        required: true
    },

    item_description: {
        type: String,
        required: true
    },

    item_category: {
        type: String,
        required: true
    },

    item_image: {
        type: String,
        required: true
    },

    item_availability: {
        type: Boolean,
        required: true
    },

    item_vegan: {
        type: Boolean,
        required: true
    },

    // item_rating: {
    //     type: Number,
        
    // },
},
{
    timestamps: true
});

const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;