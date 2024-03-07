const restaurants = require('../models/restaurants');
const menus = require('../models/menu');

const homeController = {
    home: async (req, res) => {
        try {
            const allRestaurants = await restaurants.find();
            res.status(200).send(allRestaurants);
            
        }catch (error) { 
            res.status(500).send({error: "Internal server error"});
        }
    },

    searchByRestaurant: async (req, res) => {
        try {
            const restro_id = req.params.restro_id;
            const restaurant = await restaurants.findById(restro_id);
            res.status(200).send(restaurant);
        } catch (error) {
            res.status(500).send({error: "Internal server error"});
        }
    },

    getRestaurantItems: async (req, res) => {
        try {
            const restro_id = req.params.restro_id;
            // Find all menu items related to the restaurant ID
            const restaurant_menu = await menus.find({ restaurant_id: restro_id, item_availability: true});
            res.status(200).send(restaurant_menu);
        } catch (error) {
            res.status(500).send({ error: "Internal server error" });
        }
    },
    
    searchByDishes: async (req, res) => {
        try {
            const menu_id = req.params.menu_id;
            const restaurant = await men.findById(menu_id);
            res.status(200).send(restaurant);
        } catch (error) {
            res.status(500).send({error: "Internal server error"});
        }
    }
};
module.exports = {...homeController};