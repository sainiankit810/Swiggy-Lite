const {Router} = require('express');
const auth = require('../middlewares/auth');
const cartController = require('../controllers/cart');

const router = Router();

router.post('/add/:item_id', auth, cartController.addToCart);
router.get('/getall', auth, cartController.getCart);
router.delete('/delete/:id', cartController.deleteCartItem);
router.delete('/deleteAll', auth, cartController.deleteAllCart);


module.exports = router;
