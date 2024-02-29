const menus = require('../models/menu');
const menuValidation = require('../validation/menu_validation');
const jwt = require('jsonwebtoken');


const menuController = {

    create: async (req, res) => {
        const {item_name, item_price, item_description, item_category, item_image, item_availability, item_vegan } = req.body;
        try {
            const restaurant_id = req.user_id;
            const isValid = await menuValidation(req.body);
            if (isValid.error) {
                return res.status(404).json({ message: isValid.error.details[0].message })
            }

            const existItem = await menus.findOne({$and : [{restaurant_id: restaurant_id},{item_name}]});
            if (existItem) {
                return res.status(404).json({ message: "Item already Exist." })
            }

            const newItem = await menus.create({ restaurant_id, item_name, item_price, item_description, item_category, item_image, item_availability, item_vegan});
            return res.status(200).json({ result: newItem })
        } catch (error) {
            res.status(500).json('Something went wrong');
            console.log(error)
        }
    },

    findAll: async (req, res) => {
        const allMenus = await menus.find({ restaurant_id: req.user_id});
        return res.status(200).json({ result: allMenus });
    },

    findOne: async (req, res) => {
        console.log(req.params)
        const menu = await menus.findById({ _id: req.params.menuId, restaurant_id: req.user_id });
        if (!menu) {
            return res.status(404).json({ message: "Menu not found with id " + req.params.menuId });
        }
        return res.status(200).json({ result: menu });
    },

    update: async (req, res) => {
        const { item_name, item_price, item_description, item_category, item_image, item_availability } = req.body;
        const restaurant_id = req.user_id;
        const menu = await menus.findByIdAndUpdate({ _id: req.params.menuId, restaurant_id}, {
             item_name, item_price, item_description, item_category, item_image, item_availability
        }, { new: true });

        if (!menu) {
            return res.status(404).json({ message: "Menu not found with id " + req.params.menuId });
        }

        return res.status(200).json({ result: menu });
    },

    delete: async (req, res) => {
        const menu = await menus.findByIdAndDelete({ _id: req.params.menuId, restaurant_id: req.user_id });
        if (!menu) {
            return res.status(404).json({ message: "Menu not found with id " + req.params.menuId });
        }
        return res.status(200).json({ message: "Menu deleted successfully!" });
    },
}

module.exports = {...menuController};






















// // Add item to cart
// exports.addToCart = async (req, res) => {
//     const { restaurant_id, item_id, quantity } = req.body;
//     const user_id = req.user_id;
//     const cart_id = uuidv4();
//     const item = await menus.findById(item_id);
//     if (!item) {
//         return res.status(404).send({
//             message: "Item not found with id " + item_id
//         });
//     }
//     const restaurant = await restaurants.findById(restaurant_id);
//     if (!restaurant) {
//         return res.status(404).send({
//             message: "Restaurant not found with id " + restaurant_id
//         });
//     }
//     const cartItem = new cart({
//         cart_id: cart_id,
//         user_id: user_id,
//         restaurant_id: restaurant_id,
//         item_id: item_id,
//         item_name: item.item_name,
//         item_price: item.item_price,
//         quantity: quantity
//     });
//     cartItem.save()
//         .then(data => {
//             res.send(data);
//         }).catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while adding item to cart."
//             });
//         });
// };

// // Retrieve and return all items from the cart.
// exports.getCart = (req, res) => {
//     cart.find({ user_id: req.user_id })
//         .then(items => {
//             res.send(items);
//         }).catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while retrieving cart items."
//             });
//         });
// };

// // Delete item from cart
// exports.deleteFromCart = (req, res) => {
//     cart.findByIdAndRemove(req.params.cartId)
//         .then(item => {
//             if (!item) {
//                 return res.status(404).send({
//                     message: "Item not found with id " + req.params.cartId
//                 });
//             }
//             res.send({ message: "Item deleted successfully!" });
//         }).catch(err => {
//             if (err.kind === 'ObjectId' || err.name === 'NotFound') {
//                 return res.status(404).send({
//                     message: "Item not found with id " + req.params.cartId
//                 });
//             }
//             return res.status(500).send({
//                 message: "Could not delete item with id " + req.params.cartId
//             });
//         });
// };

// // Update item in cart
// exports.updateCart = (req, res) => {
//     // Find item and update it with the request
//     cart.findByIdAndUpdate(req.params.cartId, {
//         quantity: req.body.quantity
//     }, { new: true })
//         .then(item => {
//             if (!item) {
//                 return res.status(404).send({
//                     message: "Item not found with id " + req.params.cartId
//                 });
//             }
//             res.send(item);
//         }).catch(err => {
//             if (err.kind === 'ObjectId') {
//                 return res.status(404).send({
//                     message: "Item not found with id " + req.params.cartId
//                 });
//             }
//             return res.status(500).send({
//                 message: "Error updating item with id " + req.params.cartId
//             });
//         });
// }

// // Place order
// exports.placeOrder = async (req, res) => {
//     const { user_id, restaurant_id, cart_items, total_amount } = req.body;
//     const order_id = uuidv4();
//     const order = new orders({
//         order_id: order_id,
//         user_id: user_id,
//         restaurant_id: restaurant_id,
//         cart_items: cart_items,
//         total_amount: total_amount
//     });
//     order.save()
//         .then(data => {
//             res.send(data);
//         }).catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while placing order."
//             });
//         });
// };
