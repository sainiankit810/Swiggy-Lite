const carts = require('../models/cart');
const menus = require('../models/menu');

const cartController = {
    addToCart: async (req, res) => {
        try {
            const user_id = req.user_id;
            const item_id = req.params.item_id;
            const { quantity } = req.body;
    
            // Check if the item already exists in the user's cart
            const existingCartItem = await carts.findOne({ $and: [{ user_id }, { item_id }] });
    
            if (existingCartItem) {
                // If the item already exists, update the quantity
                console.log(existingCartItem);
                const newQuantity = existingCartItem.quantity + quantity;
                console.log(newQuantity);
                const total_amount = existingCartItem.one_item_amount * newQuantity;
                console.log(total_amount);
    
                // Update the existing cart item with the new quantity and total amount
                const updatedCart = await carts.findByIdAndUpdate(existingCartItem._id, { quantity: newQuantity, total_amount }, { new: true });
    
                return res.status(200).json({ result: updatedCart });
            } else {
                // Fetch menu details from the database based on the menu_id
                const menu = await menus.findById(item_id);
                if (!menu) {
                    return res.status(404).json({ message: 'Menu not found' });
                }
    
                // Calculate total_amount based on menu price and quantity
                const one_item_amount = menu.item_price;
                const total_amount = menu.item_price * quantity;
    
                // Create a new cart item
                const newCart = await carts.create({ user_id, item_id, quantity, one_item_amount, total_amount });
                
                return res.status(200).json({ result: newCart });
            }
        } catch (error) {
            res.status(500).json('Something went wrong');
            console.log(error);
        }
    },
    

    getCart: async (req, res) => {
        const allCart = await carts.find({ user_id: req.user_id });
        return res.status(200).json({ result: allCart });
    },

    deleteCartItem: async (req, res) => {
        const cart = await carts.findByIdAndDelete(req.params.id);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found with id ' + req.params.id });
        }
        return res.status(200).json({ result: 'Cart deleted successfully' });
    },

    deleteAllCart: async (req, res) => {
        const cart = await carts.deleteMany({ user_id: req.user_id });
        return res.status(200).json({ result: 'All cart items deleted successfully' });
    }   

}

module.exports = { ...cartController };

