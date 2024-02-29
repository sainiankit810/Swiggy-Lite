const { Router } = require('express')
const address = require('../controllers/address')
const router = Router()

router.post('/add', address.addAddress)
router.get('/getall', address.getAllAddresses)
router.get('/:id', address.getAddressById)
router.put('/update/:id', address.updateAddressById)
router.delete('/delete/:id', address.deleteAddressById)

module.exports = router


