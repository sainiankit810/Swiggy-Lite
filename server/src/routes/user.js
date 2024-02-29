const {Router} = require('express');
const user = require('../controllers/user');
const auth = require('../middlewares/auth');

const router = Router();

router.post('/signup',user.signup)
router.post('/login',user.login)
router.post('/verifyOtp',user.verifyOtp)
router.get('/forgotPassword',user.forgotPassword);
router.post('/verifyForgotPassword',user.verifyForgotPasswordOtp);
router.put('/resetPassword',auth,user.resetPassword);
router.patch('/update/:id', auth, user.updateProfile)



module.exports = router;