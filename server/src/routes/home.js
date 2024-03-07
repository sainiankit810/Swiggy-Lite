const {Router} = require('express');
const auth = require('../middlewares/auth');
const homeController = require('../controllers/home');

const router = Router();

router.get('/home', homeController.home);
router.get('/home/restaurants/:restro_id', homeController.searchByRestaurant);
router.get('/home/restaurantItems/:restro_id/items', homeController.getRestaurantItems);
router.get('/home/dishes/:menu_id', homeController.searchByDishes);

module.exports = router;