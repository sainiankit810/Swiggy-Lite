const {Router} = require('express');
const restaurantController = require('../controllers/restaurant')
const auth = require('../middlewares/auth');

const router = Router();

router.post('/signup',restaurantController.signup)
router.post('/login',restaurantController.login)
router.post('/verifyOtp',restaurantController.verifyOtp)
router.get('/forgotPassword',restaurantController.forgotPassword)
router.post('/verifyForgotPassword',restaurantController.verifyForgotPasswordOtp)
router.post('/resetPassword',auth,restaurantController.resetPassword)
router.patch('/updateProfile',auth,restaurantController.updateProfile)


module.exports = router;