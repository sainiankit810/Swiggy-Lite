const orders = require('../models/orders');
const carts = require('../models/cart');

const orderController = {
  createOrder: async (req, res) => {
    try {
      const cartItems = await carts.find({ user_id: req.user_id } );

      if (!cartItems.length) {
        return res.status(400).json({ message: 'Cart is empty' });
      }

      // Calculate total amount for the order
      const totalAmount = cartItems.reduce((total, cartItem) => {
        return total + cartItems.total_amount;
      }, 0);

      // Create order
      const order = await orders.create({
        user_id: req.user_id,
        order_items: cartItems.map(item => ({
            menu_id: item.item_id,
            quantity: item.quantity
        })),
        order_time: new Date().toISOString(),
        order_status: 'pending',
        total_amount: totalAmount
      }); 

      // Clear user's cart after order is placed
      await carts.deleteMany({ user_id });

      return res.status(201).json({ message: 'Order placed successfully', order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getOrder: async (req, res) => {
    try {
      const allOrders = await orders.find({ user_id: req.user_id });
      return res.status(200).json({ result: allOrders });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
    
};

module.exports = orderController;
