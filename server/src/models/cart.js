const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    item_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu', // Reference to the Item model
    },
    quantity: {
        type: Number,
        default: 1 // Default quantity is 1
    },

    one_item_amount: {
        type: Number,
    },
    
    total_amount: {
        type: Number,
    }
},
{
    timestamps: true
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;