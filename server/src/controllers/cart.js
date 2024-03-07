const carts = require('../models/cart');
const menus = require('../models/menu');

const cartController = {
    addToCart: async (req, res) => {
        try {
            const user_id = req.user_id;
            const item_id = req.params.item_id;
            const { quantity } = req.body;
    
            // Check if the item already exists in the user's cart
            const existingSameCartItem = await carts.findOne({ $and: [{ user_id }, { item_id }] });
            if (existingSameCartItem) {
                const newQuantity = existingSameCartItem.quantity + quantity;
                const total_amount = existingSameCartItem.one_item_amount * newQuantity;

                const updatedCart = await carts.findByIdAndUpdate(existingSameCartItem._id, { quantity: newQuantity, total_amount }, { new: true });
    
                return res.status(200).json({ result: updatedCart });
            }
    
            // Check if there are existing cart items for this user
            const existingCartItem = await carts.find({ user_id });
    
            // If there are existing cart items
            if (existingCartItem.length > 0) {
                const menu = await menus.findById(item_id);
                const newRestaurantId = menu.restaurant_id;

                const hasDifferentRestaurant = existingCartItem.some(item => item.restaurant_id !== newRestaurantId);
    
                // If there are items with different restaurant IDs
                if (hasDifferentRestaurant) {
                    // Remove existing cart items for this user
                    await carts.deleteMany({ user_id });
    
                    // Create a new cart item
                    const one_item_amount = menu.item_price;
                    const total_amount = menu.item_price * quantity;
                    const newCart = await carts.create({ user_id, restaurant_id: newRestaurantId, item_id, quantity, one_item_amount, total_amount });
    
                    return res.status(200).json({ result: newCart });
                }
            }
    
            // Fetch menu details from the database based on the menu_id
            const menu = await menus.findById(item_id);
            if (!menu) {
                return res.status(404).json({ message: 'Menu not found' });
            }
    
            // Calculate total_amount based on menu price and quantity
            const restaurant_id = menu.restaurant_id;
            const one_item_amount = menu.item_price;
            const total_amount = menu.item_price * quantity;
    
            const newCart = await carts.create({ user_id, restaurant_id, item_id, quantity, one_item_amount, total_amount });
    
            return res.status(200).json({ result: newCart });
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

