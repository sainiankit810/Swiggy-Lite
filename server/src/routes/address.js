const { Router } = require('express')
const address = require('../controllers/address')
const auth = require('../middlewares/auth')
const router = Router()

router.post('/add', auth,address.addAddress)
router.get('/getall', auth, address.getAllAddresses)
router.get('/getone/:id', auth, address.getAddressById)
router.put('/update/:id', auth, address.updateAddressById)
router.delete('/delete/:id', auth, address.deleteAddressById)

module.exports = router


