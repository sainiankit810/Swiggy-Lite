const {Router} = require('express');
const orderController = require('../controllers/order');
const auth = require('../middlewares/auth');
const router = Router();

router.post('/createOrder', auth, orderController.createOrder);
router.get('/getOrder', auth, orderController.getOrder);

module.exports = router;