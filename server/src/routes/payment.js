const {Router} = require('express');
const paymentController = require('../controllers/payment')
const auth = require('../middlewares/auth');

const router = Router();

router.post('/doPayment',paymentController.payment)

module.exports = router;