const {Router} = require('express');
const menuController = require('../controllers/menu')
const auth = require('../middlewares/auth');

const router = Router();

router.post('/create',auth,menuController.create)
router.get('/all',auth, menuController.findAll)
router.get('/findone/:menuId', menuController.findOne)
router.patch('/update/:menuId', menuController.update)
router.delete('/delete/:menuId', menuController.delete)

module.exports = router;
