const restaurants = require('../models/restaurants');

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

    searchByDishes: async (req, res) => {
        try {
            const menu_id = req.params.menu_id;
            const restaurant = await restaurants.find({"menu_id": menu_id});
            res.status(200).send(restaurant);
        } catch (error) {
            res.status(500).send({error: "Internal server error"});
        }
    }
};

module.exports = {...homeController};