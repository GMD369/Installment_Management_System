const express = require('express');
const router = express.Router();
const upload = require('../utils/upload');
const customerController = require('../controllers/customerController');

router.post('/add', upload.single('document'), customerController.addCustomer);
router.get('/all', customerController.getCustomers);
router.get('/:id', customerController.getCustomerById);
router.put('/update/:id', upload.single('document'), customerController.updateCustomer);
router.delete('/delete/:id', customerController.deleteCustomer);

module.exports = router;
